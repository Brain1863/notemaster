// 类型定义
export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  isExpanded: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  isFavorite: boolean;
  tags: string[];
  aiMessages: AIMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface Config {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  autoSaveInterval: number;
  aiApiKey: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
