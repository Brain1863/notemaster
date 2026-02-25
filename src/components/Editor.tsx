import { useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useStore } from '../store';
import { Save, Bold, Italic, Link as LinkIcon, Code, List, ListOrdered, Quote, Image as ImageIcon, Minus, Strikethrough, Heading1, Heading2, Heading3, Undo, Redo } from 'lucide-react';
import './Editor.css';

export function Editor() {
  const { notes, selectedNoteId, updateNote, config } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: selectedNote?.content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (selectedNoteId && selectedNote) {
        updateNote(selectedNoteId, { content: html });
      }
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        style: `font-size: ${config.fontSize}px;`,
      },
    },
  });

  // 当切换笔记时更新编辑器内容
  useEffect(() => {
    if (editor && selectedNote) {
      const currentContent = editor.getHTML();
      if (currentContent !== selectedNote.content) {
        editor.commands.setContent(selectedNote.content || '');
      }
    }
  }, [selectedNoteId, editor]);

  const handleSave = useCallback(() => {
    if (editor && selectedNoteId && selectedNote) {
      const content = editor.getHTML();
      if (content !== selectedNote.content) {
        updateNote(selectedNoteId, { content });
      }
    }
  }, [editor, selectedNoteId, selectedNote, updateNote]);

  // 快捷键保存
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  // 处理图片插入
  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor.chain().focus().setImage({ src: base64, alt: file.name }).run();
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  }, [editor]);

  const triggerImageSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!selectedNote) {
    return (
      <div className="editor-empty">
        <div className="empty-content">
          <h3>选择或创建一篇笔记</h3>
          <p>从左侧边栏选择一篇笔记开始编辑，或创建新的笔记。</p>
        </div>
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="editor" data-color-mode={config.theme}>
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            className="title-input"
            value={selectedNote.title}
            onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
            placeholder="笔记标题"
          />
        </div>
        <div className="toolbar-actions">
          <button
            className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="粗体 (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="斜体 (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="删除线"
          >
            <Strikethrough size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('link') ? 'active' : ''}`}
            onClick={setLink}
            title="链接"
          >
            <LinkIcon size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('code') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="行内代码"
          >
            <Code size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="标题1"
          >
            <Heading1 size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="标题2"
          >
            <Heading2 size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="标题3"
          >
            <Heading3 size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="无序列表"
          >
            <List size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="有序列表"
          >
            <ListOrdered size={16} />
          </button>
          <button
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="引用"
          >
            <Quote size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={triggerImageSelect}
            title="图片"
          >
            <ImageIcon size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="分割线"
          >
            <Minus size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="撤销"
          >
            <Undo size={16} />
          </button>
          <button
            className="toolbar-btn"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="重做"
          >
            <Redo size={16} />
          </button>
          <button
            className="toolbar-btn save-btn"
            onClick={handleSave}
            title="保存 (Ctrl+S)"
          >
            <Save size={16} />
          </button>
        </div>
      </div>

      <div className="editor-content" data-color-mode={config.theme}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
        <EditorContent editor={editor} />
      </div>

      <div className="editor-footer">
        <span className="word-count">
          {editor.storage.characterCount?.characters?.() || editor.getText().length} 字符
        </span>
        <span className="save-status">
          已保存
        </span>
      </div>
    </div>
  );
}
