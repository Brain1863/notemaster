import { useEffect, useState } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { AIPanel } from './components/AIPanel';
import { TitleBar } from './components/TitleBar';
import { AIFloatingButton } from './components/AIFloatingButton';
import './App.css';

function App() {
  const { config, initializeData, isAIPanelOpen } = useStore();
  const [isMobileAIOpen, setIsMobileAIOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 初始化数据
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // 应用主题
  useEffect(() => {
    const root = document.documentElement;
    let theme = config.theme;

    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    root.setAttribute('data-theme', theme);
  }, [config.theme]);

  // 移动端 AI 浮窗切换
  const handleMobileAIToggle = () => {
    setIsMobileAIOpen(!isMobileAIOpen);
  };

  const handleMobileAIClose = () => {
    setIsMobileAIOpen(false);
  };

  return (
    <div className="app">
      <TitleBar />
      <div className="app-content">
        <Sidebar />
        <Editor />
        {/* 移动端使用浮窗按钮，桌面端使用普通面板 */}
        {isMobile ? (
          <AIFloatingButton
            isOpen={isMobileAIOpen}
            onToggle={handleMobileAIToggle}
            onClose={handleMobileAIClose}
          />
        ) : (
          isAIPanelOpen ? <AIPanel /> : null
        )}
      </div>
    </div>
  );
}

export default App;
