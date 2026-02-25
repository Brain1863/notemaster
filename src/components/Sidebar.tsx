import { useState, useRef, useEffect } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  Plus,
  MoreVertical,
  Star,
  StarOff,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit3,
} from 'lucide-react';
import { useStore } from '../store';
import type { Folder as FolderType, Note } from '../types';
import './Sidebar.css';

interface TreeItemProps {
  item: FolderType | Note;
  isFolder: boolean;
  level: number;
  children?: React.ReactNode;
}

function TreeItem({ item, isFolder, level, children }: TreeItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    selectedNoteId,
    selectNote,
    toggleFolderExpanded,
    updateFolder,
    updateNote,
    deleteFolder,
    deleteNote,
    addFolder,
    addNote,
    toggleFavorite,
  } = useStore();

  const isSelected = isFolder ? false : selectedNoteId === item.id;
  const isExpanded = isFolder ? (item as FolderType).isExpanded : false;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (isFolder) {
      toggleFolderExpanded(item.id);
    } else {
      selectNote(item.id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const handleRename = () => {
    setEditName(isFolder ? (item as FolderType).name : (item as Note).title);
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveRename = () => {
    if (editName.trim()) {
      if (isFolder) {
        updateFolder(item.id, { name: editName.trim() });
      } else {
        updateNote(item.id, { title: editName.trim() });
      }
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (isFolder) {
      deleteFolder(item.id);
    } else {
      deleteNote(item.id);
    }
    setShowMenu(false);
  };

  const handleNewNote = () => {
    addNote(item.id);
    setShowMenu(false);
  };

  const handleNewFolder = () => {
    addFolder('新建文件夹', item.id);
    setShowMenu(false);
  };

  const handleToggleFavorite = () => {
    if (!isFolder) {
      toggleFavorite(item.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="tree-item-container">
      <div
        className={`tree-item ${isSelected ? 'selected' : ''} ${isFolder ? 'folder' : 'note'}`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {isFolder && (
          <span className="folder-icon">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {isFolder ? (
          isExpanded ? (
            <FolderOpen size={16} className="item-icon folder-icon-color" />
          ) : (
            <Folder size={16} className="item-icon folder-icon-color" />
          )
        ) : (
          <FileText size={16} className="item-icon note-icon-color" />
        )}

        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveRename}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
            className="rename-input"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="item-name">
            {isFolder ? (item as FolderType).name : (item as Note).title}
          </span>
        )}

        {!isFolder && (item as Note).isFavorite && (
          <Star size={14} className="favorite-icon" fill="#FBBF24" color="#FBBF24" />
        )}

        <div className="item-actions" ref={menuRef}>
          <button
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={14} />
          </button>
          {showMenu && (
            <div className="context-menu">
              {isFolder && (
                <>
                  <button onClick={handleNewNote}>
                    <Plus size={14} /> 新建笔记
                  </button>
                  <button onClick={handleNewFolder}>
                    <Folder size={14} /> 新建文件夹
                  </button>
                  <div className="menu-divider" />
                </>
              )}
              <button onClick={handleRename}>
                <Edit3 size={14} /> 重命名
              </button>
              {!isFolder && (
                <button onClick={handleToggleFavorite}>
                  {(item as Note).isFavorite ? (
                    <>
                      <StarOff size={14} /> 取消收藏
                    </>
                  ) : (
                    <>
                      <Star size={14} /> 收藏
                    </>
                  )}
                </button>
              )}
              <button onClick={handleDelete} className="delete-btn">
                <Trash2 size={14} /> 删除
              </button>
            </div>
          )}
        </div>
      </div>

      {isFolder && isExpanded && (
        <div className="tree-children">
          {children}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { folders, notes, addFolder, addNote, selectNote, selectedNoteId } = useStore();

  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const rootFolders = folders.filter((f) => f.parentId === null);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const favoriteNotes = notes.filter((n) => n.isFavorite);

  const renderTree = (parentId: string | null, level: number): React.ReactNode => {
    const childFolders = folders.filter((f) => f.parentId === parentId);
    const childNotes = notes.filter((n) => n.folderId === parentId);

    return (
      <>
        {childFolders.map((folder) => (
          <TreeItem
            key={folder.id}
            item={folder}
            isFolder={true}
            level={level}
          >
            {renderTree(folder.id, level + 1)}
          </TreeItem>
        ))}
        {childNotes.map((note) => (
          <TreeItem
            key={note.id}
            item={note}
            isFolder={false}
            level={level}
          />
        ))}
      </>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>NoteMaster</h2>
      </div>

      {/* 收藏夹 */}
      {favoriteNotes.length > 0 && (
        <div className="sidebar-section">
          <div className="section-header">
            <Star size={14} />
            <span>收藏</span>
          </div>
          <div className="section-content">
            {favoriteNotes.map((note) => (
              <div
                key={note.id}
                className={`sidebar-note-item ${selectedNoteId === note.id ? 'selected' : ''}`}
                onClick={() => selectNote(note.id)}
              >
                <Star size={14} fill="#FBBF24" color="#FBBF24" />
                <span>{note.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 文件夹树 */}
      <div className="sidebar-section flex-grow">
        <div className="section-header">
          <span>文件夹</span>
          <button
            className="add-btn"
            onClick={() => setShowNewFolderInput(true)}
            title="新建文件夹"
          >
            <Plus size={14} />
          </button>
        </div>

        {showNewFolderInput && (
          <div className="new-item-input">
            <input
              type="text"
              placeholder="文件夹名称"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
                if (e.key === 'Escape') setShowNewFolderInput(false);
              }}
              autoFocus
            />
            <button onClick={handleCreateFolder}>确认</button>
            <button onClick={() => setShowNewFolderInput(false)}>取消</button>
          </div>
        )}

        <div className="section-content tree-view">
          {rootFolders.map((folder) => (
            <TreeItem
              key={folder.id}
              item={folder}
              isFolder={true}
              level={0}
            >
              {renderTree(folder.id, 1)}
            </TreeItem>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="sidebar-footer">
        <button
          className="new-note-btn"
          onClick={() => {
            const firstFolder = folders[0];
            if (firstFolder) {
              addNote(firstFolder.id);
            } else {
              addFolder('我的笔记');
            }
          }}
        >
          <Plus size={16} />
          <span>新建笔记</span>
        </button>
      </div>
    </div>
  );
}
