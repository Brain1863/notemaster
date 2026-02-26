import type { Note, Folder, Config, AIMessage } from '../types';

/**
 * 导出笔记为指定格式
 * @param note 要导出的笔记
 * @param format 导出格式：'md' | 'txt'
 */
export function exportNote(note: Note, format: 'md' | 'txt'): void {
  let content: string;
  let mimeType: string;
  let extension: string;

  if (format === 'md') {
    // Markdown 格式：直接使用内容
    content = note.content;
    mimeType = 'text/markdown;charset=utf-8';
    extension = 'md';
  } else {
    // TXT 格式：移除 Markdown 标记
    content = stripMarkdown(note.content);
    mimeType = 'text/plain;charset=utf-8';
    extension = 'txt';
  }

  // 创建 Blob 并触发下载
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // 使用笔记标题作为文件名
  const filename = note.title.replace(/[\\/:*?"<>|]/g, '_') || '未命名笔记';
  link.download = `${filename}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 移除 Markdown 格式标记，转换为纯文本
 */
function stripMarkdown(text: string): string {
  return text
    // 移除代码块
    .replace(/```[\s\S]*?```/g, '')
    // 移除行内代码
    .replace(/`[^`]+`/g, '')
    // 移除标题标记
    .replace(/^#{1,6}\s+/gm, '')
    // 移除加粗
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // 移除斜体
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // 移除删除线
    .replace(/~~([^~]+)~~/g, '$1')
    // 移除链接，保留文本
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除图片
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // 移除引用标记
    .replace(/^>\s+/gm, '')
    // 移除无序列表标记
    .replace(/^[-*+]\s+/gm, '')
    // 移除有序列表标记
    .replace(/^\d+\.\s+/gm, '')
    // 移除水平线
    .replace(/^---+$/gm, '')
    .replace(/^\*\*\*+$/gm, '')
    // 移除表格
    .replace(/\|.+\|/g, '')
    // 清理多余空行
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * 导出全部数据（用于备份）
 */
export function exportAllData(data: {
  folders: Folder[];
  notes: Note[];
  config: Config;
  globalAIMessages: AIMessage[];
}): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const timestamp = new Date().toISOString().slice(0, 10);
  link.download = `notemaster-backup-${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 导入数据（从备份文件）
 */
export function importData(): Promise<{
  folders: Folder[];
  notes: Note[];
  config: Config;
  globalAIMessages: AIMessage[];
} | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        // 简单验证
        if (data.folders && data.notes && data.config) {
          resolve(data);
        } else {
          alert('文件格式不正确');
          resolve(null);
        }
      } catch (err) {
        alert('文件读取失败');
        resolve(null);
      }
    };
    input.click();
  });
}
