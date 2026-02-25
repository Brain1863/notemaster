import { useState } from 'react';
import { useStore } from '../store';
import { Settings as SettingsIcon, X, Sun, Moon, Monitor, Key, Type, Clock } from 'lucide-react';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const { config, updateConfig } = useStore();
  const [apiKey, setApiKey] = useState(config.aiApiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSaveApiKey = () => {
    updateConfig({ aiApiKey: apiKey });
  };

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
              <Key size={16} />
              AI 配置
            </h3>
            <div className="setting-item">
              <label>MiniMax API Key</label>
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
                获取 API Key 访问 MiniMax 开放平台
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
