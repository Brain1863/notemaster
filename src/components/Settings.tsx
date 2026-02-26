import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Settings as SettingsIcon, X, Sun, Moon, Monitor, Type, Clock, Bot, Download, Upload } from 'lucide-react';
import type { AIProvider } from '../types';
import { exportNote, exportAllData, importData } from '../utils/export';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const { config, updateConfig, selectedNoteId, notes, folders, globalAIMessages, importData: doImportData } = useStore();
  const [apiKey, setApiKey] = useState(config.aiApiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  // 获取当前选中的笔记
  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  useEffect(() => {
    setApiKey(config.aiApiKey);
  }, [config.aiApiKey]);

  const handleSaveApiKey = () => {
    updateConfig({ aiApiKey: apiKey });
  };

  const aiProviders: { value: AIProvider; label: string; hint: string }[] = [
    { value: 'minimax', label: 'MiniMax', hint: 'Moonshot AI' },
    { value: 'kimi', label: 'Kimi', hint: '月之暗面' },
    { value: 'glm', label: 'GLM', hint: '智谱 AI' },
  ];

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>
            <SettingsIcon size={20} />
            设置
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          {/* 导出笔记 */}
          {selectedNote && (
            <div className="settings-section">
              <h3>
                <Download size={16} />
                导出笔记
              </h3>
              <div className="setting-item">
                <label>当前笔记：{selectedNote.title || '未命名'}</label>
                <div className="export-options">
                  <button
                    className="export-btn"
                    onClick={() => exportNote(selectedNote, 'md')}
                  >
                    导出 Markdown (.md)
                  </button>
                  <button
                    className="export-btn"
                    onClick={() => exportNote(selectedNote, 'txt')}
                  >
                    导出纯文本 (.txt)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 数据备份 */}
          <div className="settings-section">
            <h3>
              <Upload size={16} />
              数据备份
            </h3>
            <div className="setting-item">
              <label>导出/导入全部数据（保存在本地文件）</label>
              <div className="export-options">
                <button
                  className="export-btn"
                  onClick={() => exportAllData({ folders, notes, config, globalAIMessages })}
                >
                  导出备份
                </button>
                <button
                  className="export-btn"
                  onClick={async () => {
                    const data = await importData();
                    if (data) {
                      if (confirm('导入数据将覆盖当前所有笔记，确定要继续吗？')) {
                        doImportData(data);
                        alert('导入成功！');
                        onClose();
                      }
                    }
                  }}
                >
                  导入备份
                </button>
              </div>
              <p className="setting-hint">导出的备份文件可以在任何时候导入恢复</p>
            </div>
          </div>

          {/* 主题设置 */}
          <div className="settings-section">
            <h3>
              <Sun size={16} />
              外观
            </h3>
            <div className="setting-item">
              <label>主题</label>
              <div className="theme-options">
                <button
                  className={`theme-btn ${config.theme === 'light' ? 'active' : ''}`}
                  onClick={() => updateConfig({ theme: 'light' })}
                >
                  <Sun size={16} />
                  浅色
                </button>
                <button
                  className={`theme-btn ${config.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => updateConfig({ theme: 'dark' })}
                >
                  <Moon size={16} />
                  深色
                </button>
                <button
                  className={`theme-btn ${config.theme === 'system' ? 'active' : ''}`}
                  onClick={() => updateConfig({ theme: 'system' })}
                >
                  <Monitor size={16} />
                  跟随系统
                </button>
              </div>
            </div>
          </div>

          {/* 编辑器设置 */}
          <div className="settings-section">
            <h3>
              <Type size={16} />
              编辑器
            </h3>
            <div className="setting-item">
              <label>字体大小</label>
              <div className="range-input">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={config.fontSize}
                  onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
                />
                <span>{config.fontSize}px</span>
              </div>
            </div>
            <div className="setting-item">
              <label>
                <Clock size={14} />
                自动保存间隔
              </label>
              <select
                value={config.autoSaveInterval}
                onChange={(e) => updateConfig({ autoSaveInterval: parseInt(e.target.value) })}
              >
                <option value={1000}>1 秒</option>
                <option value={3000}>3 秒</option>
                <option value={5000}>5 秒</option>
                <option value={10000}>10 秒</option>
              </select>
            </div>
          </div>

          {/* AI 设置 */}
          <div className="settings-section">
            <h3>
              <Bot size={16} />
              AI 配置
            </h3>
            <div className="setting-item">
              <label>AI 提供商</label>
              <div className="ai-provider-options">
                {aiProviders.map((provider) => (
                  <button
                    key={provider.value}
                    className={`provider-btn ${config.aiProvider === provider.value ? 'active' : ''}`}
                    onClick={() => updateConfig({ aiProvider: provider.value })}
                  >
                    <span className="provider-name">{provider.label}</span>
                    <span className="provider-hint">{provider.hint}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="setting-item">
              <label>{config.aiProvider === 'minimax' ? 'MiniMax' : config.aiProvider === 'kimi' ? 'Kimi' : 'GLM'} API Key</label>
              <div className="api-key-input">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="请输入 API Key"
                />
                <button
                  className="toggle-visibility"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <Moon size={14} /> : <Sun size={14} />}
                </button>
                <button className="save-api-key" onClick={handleSaveApiKey}>
                  保存
                </button>
              </div>
              <p className="setting-hint">
                获取 API Key 访问 {config.aiProvider === 'minimax' ? 'MiniMax' : config.aiProvider === 'kimi' ? 'Kimi' : '智谱 AI'} 开放平台
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
