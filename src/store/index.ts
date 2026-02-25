import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Folder, Note, Config, AIMessage } from '../types';

interface AppState {
  // 数据
  folders: Folder[];
  notes: Note[];
  selectedNoteId: string | null;
  selectedFolderId: string | null;

  // 配置
  config: Config;

  // AI (per-note, stored in Note.aiMessages + global AI)
  isAIPanelOpen: boolean;
  globalAIMessages: AIMessage[];

  // UI
  isAIPanelExpanded: boolean;

  // 文件夹操作
  addFolder: (name: string, parentId?: string | null) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  toggleFolderExpanded: (id: string) => void;

  // 笔记操作
  addNote: (folderId: string, title?: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  moveNote: (noteId: string, targetFolderId: string) => void;

  // 配置操作
  updateConfig: (updates: Partial<Config>) => void;

  // AI 操作 (per-note)
  addAIMessage: (noteId: string, message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearAIMessages: (noteId: string) => void;
  // 全局 AI 操作
  addGlobalAIMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearGlobalAIMessages: () => void;
  toggleAIPanel: () => void;
  setAIPanelExpanded: (expanded: boolean) => void;

  // 初始化
  initializeData: () => void;
}

const defaultConfig: Config = {
  theme: 'light',
  fontSize: 15,
  autoSaveInterval: 3000,
  aiProvider: 'minimax',
  aiApiKey: '',
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      folders: [],
      notes: [],
      selectedNoteId: null,
      selectedFolderId: null,
      config: defaultConfig,
      isAIPanelOpen: true,
      isAIPanelExpanded: true,
      globalAIMessages: [],

      initializeData: () => {
        const { folders, notes } = get();
        if (folders.length === 0 && notes.length === 0) {
          // 创建默认文件夹和笔记
          const defaultFolderId = uuidv4();
          const defaultNoteId = uuidv4();
          const now = Date.now();

          set({
            folders: [
              {
                id: defaultFolderId,
                name: '我的笔记',
                parentId: null,
                isExpanded: true,
                createdAt: now,
                updatedAt: now,
              },
            ],
            notes: [
              {
                id: defaultNoteId,
                title: '欢迎使用 NoteMaster',
                content: `# 欢迎使用 NoteMaster

这是一款功能强大的笔记应用，支持 Markdown 语法编写。

## 主要功能

- **Markdown 编辑**：完整的 Markdown 支持
- **文件夹管理**：多层级文件夹整理
- **AI 助手**：智能辅助写作（每个笔记独立的AI记忆）
- **本地存储**：数据安全存储在本地

## 快捷键

- \`Ctrl+S\`：保存
- \`Ctrl+B\`：粗体
- \`Ctrl+I\`：斜体
- \`Ctrl+K\`：插入链接

开始您的笔记之旅吧！`,
                folderId: defaultFolderId,
                isFavorite: false,
                tags: [],
                aiMessages: [],
                createdAt: now,
                updatedAt: now,
              },
            ],
            selectedNoteId: defaultNoteId,
            selectedFolderId: defaultFolderId,
          });
        }
      },

      addFolder: (name, parentId = null) => {
        const now = Date.now();
        const newFolder: Folder = {
          id: uuidv4(),
          name,
          parentId,
          isExpanded: true,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ folders: [...state.folders, newFolder] }));
      },

      updateFolder: (id, updates) => {
        set((state) => ({
          folders: state.folders.map((f) =>
            f.id === id ? { ...f, ...updates, updatedAt: Date.now() } : f
          ),
        }));
      },

      deleteFolder: (id) => {
        set((state) => {
          // 删除文件夹及其所有子文件夹和笔记
          const folderIdsToDelete = new Set<string>();
          const collectFolderIds = (folderId: string) => {
            folderIdsToDelete.add(folderId);
            state.folders
              .filter((f) => f.parentId === folderId)
              .forEach((f) => collectFolderIds(f.id));
          };
          collectFolderIds(id);

          const folderIdArray = Array.from(folderIdsToDelete);
          const noteIdsToDelete = state.notes
            .filter((n) => folderIdArray.includes(n.folderId))
            .map((n) => n.id);

          return {
            folders: state.folders.filter((f) => !folderIdsToDelete.has(f.id)),
            notes: state.notes.filter((n) => !noteIdsToDelete.includes(n.id)),
            selectedNoteId:
              state.selectedNoteId && noteIdsToDelete.includes(state.selectedNoteId)
                ? null
                : state.selectedNoteId,
          };
        });
      },

      toggleFolderExpanded: (id) => {
        set((state) => ({
          folders: state.folders.map((f) =>
            f.id === id ? { ...f, isExpanded: !f.isExpanded } : f
          ),
        }));
      },

      addNote: (folderId, title = '新建笔记') => {
        const now = Date.now();
        const newNote: Note = {
          id: uuidv4(),
          title,
          content: '',
          folderId,
          isFavorite: false,
          tags: [],
          aiMessages: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          notes: [...state.notes, newNote],
          selectedNoteId: newNote.id,
        }));
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
          selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
        }));
      },

      selectNote: (id) => {
        set({ selectedNoteId: id });
      },

      toggleFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
          ),
        }));
      },

      moveNote: (noteId, targetFolderId) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === noteId
              ? { ...n, folderId: targetFolderId, updatedAt: Date.now() }
              : n
          ),
        }));
      },

      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates },
        }));
      },

      addAIMessage: (noteId, message) => {
        const newMessage: AIMessage = {
          ...message,
          id: uuidv4(),
          timestamp: Date.now(),
        };
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === noteId
              ? { ...n, aiMessages: [...(n.aiMessages || []), newMessage], updatedAt: Date.now() }
              : n
          ),
        }));
      },

      clearAIMessages: (noteId) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === noteId
              ? { ...n, aiMessages: n.aiMessages || [], updatedAt: Date.now() }
              : n
          ),
        }));
      },

      addGlobalAIMessage: (message) => {
        const newMessage: AIMessage = {
          ...message,
          id: uuidv4(),
          timestamp: Date.now(),
        };
        set((state) => ({
          globalAIMessages: [...state.globalAIMessages, newMessage],
        }));
      },

      clearGlobalAIMessages: () => {
        set({ globalAIMessages: [] });
      },

      toggleAIPanel: () => {
        set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen }));
      },

      setAIPanelExpanded: (expanded) => {
        set({ isAIPanelExpanded: expanded });
      },
    }),
    {
      name: 'notemaster-storage',
      partialize: (state) => ({
        folders: state.folders,
        notes: state.notes,
        config: state.config,
        globalAIMessages: state.globalAIMessages,
      }),
    }
  )
);
