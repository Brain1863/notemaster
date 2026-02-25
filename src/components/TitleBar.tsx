import { Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';
import { Settings } from './Settings';
import './TitleBar.css';

export function TitleBar() {
  const { toggleAIPanel, isAIPanelOpen } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-left">
          <span className="app-name">NoteMaster</span>
        </div>
        <div className="title-bar-right">
          <button
            className={`title-bar-btn ${isAIPanelOpen ? 'active' : ''}`}
            onClick={toggleAIPanel}
            title="AI 助手"
          >
            <Sparkles size={16} />
          </button>
          <button
            className="title-bar-btn"
            onClick={() => setIsSettingsOpen(true)}
            title="设置"
          >
            <SettingsIcon size={16} />
          </button>
        </div>
      </div>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
