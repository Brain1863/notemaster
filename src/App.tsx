import { useEffect } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { AIPanel } from './components/AIPanel';
import { TitleBar } from './components/TitleBar';
import './App.css';

function App() {
  const { config, initializeData, isAIPanelOpen } = useStore();

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

  return (
    <div className="app">
      <TitleBar />
      <div className="app-content">
        <Sidebar />
        <Editor />
        {isAIPanelOpen ? <AIPanel /> : null}
      </div>
    </div>
  );
}

export default App;
