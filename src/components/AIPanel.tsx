import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { MessageCircle, X, Send, Settings, ChevronLeft, ChevronRight, Trash2, Sparkles } from 'lucide-react';
import type { AIProvider } from '../types';
import './AIPanel.css';

// AI API 配置
const AI_CONFIG: Record<AIProvider, { endpoint: string; model: string }> = {
  minimax: {
    endpoint: '/api/minimax',
    model: 'abab6.5s-chat',
  },
  kimi: {
    endpoint: '/api/kimi',
    model: 'moonshot-v1-8k',
  },
  glm: {
    endpoint: '/api/glm',
    model: 'glm-4-flash',
  },
};

export function AIPanel() {
  const { isAIPanelOpen, toggleAIPanel, isAIPanelExpanded, setAIPanelExpanded, addAIMessage, clearAIMessages, addGlobalAIMessage, clearGlobalAIMessages, globalAIMessages, config, notes, selectedNoteId } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId);
  // 如果有选中的笔记，使用笔记的AI消息；否则使用全局AI消息
  const aiMessages = selectedNoteId ? (selectedNote?.aiMessages || []) : globalAIMessages;
  const isGlobalMode = !selectedNoteId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  const handleSend = async () => {
    console.log('handleSend called', { input: input.trim(), hasApiKey: !!config.aiApiKey, selectedNoteId, isGlobalMode });

    setError(null);

    if (!input.trim()) {
      console.log('Empty input, returning');
      return;
    }

    if (!config.aiApiKey) {
      console.log('No API key, setting error');
      const providerName = config.aiProvider === 'minimax' ? 'MiniMax' : config.aiProvider === 'kimi' ? 'Kimi' : 'GLM';
      setError(`请先在设置中配置 ${providerName} API Key`);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    console.log('Adding user message to store...');

    // 添加用户消息
    if (isGlobalMode) {
      addGlobalAIMessage({ role: 'user', content: userMessage });
    } else if (selectedNoteId) {
      addAIMessage(selectedNoteId, { role: 'user', content: userMessage });
    }
    console.log('User message added, calling API...');
    setIsLoading(true);

    try {
      const provider = config.aiProvider;
      const aiConfig = AI_CONFIG[provider];
      console.log(`Calling ${provider} API...`);

      // 构建消息列表
      const messages = [
        {
          role: 'system',
          content: isGlobalMode
            ? '你是一个智能AI助手，擅长回答各种问题、帮助用户解决问题。请用中文回复。'
            : '你是一个智能笔记助手，擅长帮助用户写作、润色文章、回答问题。请用中文回复。'
        },
        ...aiMessages.slice(-10).map(m => ({
          role: m.role,
          content: m.content
        })),
        {
          role: 'user',
          content: selectedNote?.content ? `当前笔记内容：\n${selectedNote.content}\n\n用户问题：${userMessage}` : userMessage
        }
      ];

      // 根据不同 AI 供应商构建请求
      let requestBody: Record<string, unknown>;
      if (provider === 'minimax') {
        requestBody = {
          model: aiConfig.model,
          messages,
        };
      } else if (provider === 'kimi') {
        requestBody = {
          model: aiConfig.model,
          messages,
          temperature: 0.7,
        };
      } else if (provider === 'glm') {
        requestBody = {
          model: aiConfig.model,
          messages,
          temperature: 0.7,
        };
      } else {
        throw new Error('不支持的 AI 提供商');
      }

      // 使用 Vite 代理避免 CORS
      const response = await fetch(aiConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.aiApiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      const data = await response.json();

      console.log('API Response:', data);

      const addAssistantMessage = (content: string) => {
        if (isGlobalMode) {
          addGlobalAIMessage({ role: 'assistant', content });
        } else if (selectedNoteId) {
          addAIMessage(selectedNoteId, { role: 'assistant', content });
        }
      };

      // 通用响应处理
      if (data.choices && data.choices[0]?.message?.content) {
        addAssistantMessage(data.choices[0].message.content);
      } else if (data.base_resp?.status_msg) {
        addAssistantMessage(`API 错误: ${data.base_resp.status_msg}`);
      } else if (data.msg) {
        addAssistantMessage(data.msg);
      } else {
        addAssistantMessage('抱歉，API 返回格式异常。请检查 API Key 是否正确。响应: ' + JSON.stringify(data).substring(0, 200));
      }
    } catch (error) {
      const errorContent = `请求失败: ${error instanceof Error ? error.message : '请检查网络连接和 API Key 配置'}`;
      if (isGlobalMode) {
        addGlobalAIMessage({ role: 'assistant', content: errorContent });
      } else if (selectedNoteId) {
        addAIMessage(selectedNoteId, { role: 'assistant', content: errorContent });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: '润色', prompt: '请帮我润色以下内容，使语言更流畅优美：' },
    { label: '摘要', prompt: '请为以下内容生成简洁的摘要：' },
    { label: '扩写', prompt: '请帮我扩写以下内容，使其更丰富详细：' },
    { label: '翻译', prompt: '请翻译以下内容为英文：' },
  ];

  const handleQuickAction = (prompt: string) => {
    if (selectedNote?.content) {
      setInput(prompt + '\n\n' + selectedNote.content.substring(0, 2000));
    }
  };

  if (!isAIPanelOpen) {
    return (
      <div className="ai-panel-collapsed">
        <button className="ai-toggle-btn" onClick={toggleAIPanel} title="展开 AI 助手">
          <Sparkles size={20} />
          <span>AI</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`ai-panel ${isAIPanelExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="ai-panel-header">
        <div className="header-left">
          <button
            className="collapse-btn"
            onClick={() => setAIPanelExpanded(!isAIPanelExpanded)}
          >
            {isAIPanelExpanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <MessageCircle size={18} />
          <span>AI 助手</span>
          {isAIPanelExpanded && (
            isGlobalMode ? (
              <span className="ai-note-indicator global-mode">通用模式</span>
            ) : selectedNote ? (
              <span className="ai-note-indicator" title={selectedNote.title}>
                {selectedNote.title.length > 10 ? selectedNote.title.substring(0, 10) + '...' : selectedNote.title}
              </span>
            ) : null
          )}
        </div>
        <div className="header-right">
          {isAIPanelExpanded && aiMessages.length > 0 && (
            <button
              className="header-btn"
              onClick={() => isGlobalMode ? clearGlobalAIMessages() : clearAIMessages(selectedNoteId!)}
              title="清空对话"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button className="header-btn" onClick={toggleAIPanel} title="关闭">
            <X size={16} />
          </button>
        </div>
      </div>

      {isAIPanelExpanded && (
        <>
          {!config.aiApiKey ? (
            <div className="ai-settings-prompt">
              <Settings size={32} />
              <h4>需要配置 API Key</h4>
              <p>请在设置中配置 MiniMax API Key 以使用 AI 功能。</p>
            </div>
          ) : (
            <>
              <div className="ai-quick-actions">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    disabled={!selectedNote?.content}
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              <div className="ai-messages">
                {aiMessages.length === 0 && (
                  <div className="ai-welcome">
                    <Sparkles size={32} />
                    <h4>{isGlobalMode ? '你好！我是通用 AI 助手' : '你好！我是笔记 AI 助手'}</h4>
                    <p>我可以帮助你：</p>
                    <ul>
                      {isGlobalMode ? (
                        <>
                          <li>回答各种问题</li>
                          <li>提供信息和建议</li>
                          <li>帮助解决问题</li>
                          <li>聊天交流</li>
                        </>
                      ) : (
                        <>
                          <li>润色和优化文章内容</li>
                          <li>生成文章摘要</li>
                          <li>扩写或改写内容</li>
                          <li>解答问题</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
                {aiMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`ai-message ${message.role}`}
                  >
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="ai-message assistant loading">
                    <div className="message-content">
                      <span className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="ai-input-container">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入问题..."
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <Send size={16} />
                </button>
              </div>
              {error && (
                <div className="ai-error-message">
                  {error}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
