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
  Search,
  MoveRight,
  X,
} from 'lucide-react';
import { useStore } from '../store';
import type { Folder as FolderType, Note } from '../types';
import './Sidebar.css';

interface TreeItemProps {
  item: FolderType | Note;
  isFolder: boolean;
  level: number;
  highlight?: string;
  children?: React.ReactNode;
}

function TreeItem({ item, isFolder, level, highlight, children }: TreeItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);
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
    moveNote,
    folders,
  } = useStore();

  const isSelected = isFolder ? false : selectedNoteId === item.id;
  const isExpanded = isFolder ? (item as FolderType).isExpanded : false;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        setShowMoveMenu(false);
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

  const handleMoveNote = (targetFolderId: string) => {
    moveNote(item.id, targetFolderId);
    setShowMoveMenu(false);
    setShowMenu(false);
  };

  // 高亮匹配文本
  const renderHighlightedName = (name: string) => {
    if (!highlight) return name;
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = name.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
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
            {isFolder
              ? renderHighlightedName((item as FolderType).name)
              : renderHighlightedName((item as Note).title)}
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
              setShowMoveMenu(false);
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
                <>
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
                  <button onClick={() => setShowMoveMenu(!showMoveMenu)}>
                    <MoveRight size={14} /> 移动到
                  </button>
                  {showMoveMenu && (
                    <div className="move-submenu">
                      {folders
                        .filter((f) => f.id !== (item as Note).folderId)
                        .map((f) => (
                          <button key={f.id} onClick={() => handleMoveNote(f.id)}>
                            <Folder size={12} /> {f.name}
                          </button>
                        ))}
                    </div>
                  )}
                </>
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

  // 搜索状态（节流：150ms）
  const [searchInput, setSearchInput] = useState('');
  const [displayQuery, setDisplayQuery] = useState('');
  const searchTimerRef = useRef<number | null>(null);

  const rootFolders = folders.filter((f) => f.parentId === null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = window.setTimeout(() => {
      setDisplayQuery(val.trim());
    }, 150);
  };

  const clearSearch = () => {
    setSearchInput('');
    setDisplayQuery('');
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
  };

  // 搜索结果
  const searchResults = displayQuery
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(displayQuery.toLowerCase()) ||
          n.content.toLowerCase().includes(displayQuery.toLowerCase())
      )
    : [];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const favoriteNotes = notes.filter((n) => n.isFavorite);

  // 获取笔记所在文件夹名称
  const getFolderName = (folderId: string) => {
    return folders.find((f) => f.id === folderId)?.name || '未知文件夹';
  };

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
            highlight={displayQuery}
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
            highlight={displayQuery}
          />
        ))}
      </>
    );
  };

  // 新建笔记：优先使用当前选中笔记所在的文件夹
  const handleNewNote = () => {
    if (selectedNoteId) {
      const currentNote = notes.find((n) => n.id === selectedNoteId);
      if (currentNote) {
        addNote(currentNote.folderId);
        return;
      }
    }
    const firstFolder = folders[0];
    if (firstFolder) {
      addNote(firstFolder.id);
    } else {
      addFolder('我的笔记');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>NoteMaster</h2>
      </div>

      {/* 搜索框 */}
      <div className="sidebar-search">
        <Search size={14} className="search-icon" />
        <input
          type="text"
          placeholder="搜索笔记..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchInput && (
          <button className="search-clear" onClick={clearSearch}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* 搜索结果 */}
      {displayQuery && (
        <div className="sidebar-section flex-grow">
          <div className="section-header">
            <Search size={14} />
            <span>搜索结果 ({searchResults.length})</span>
          </div>
          <div className="section-content">
            {searchResults.length === 0 ? (
              <div className="search-empty">未找到匹配笔记</div>
            ) : (
              searchResults.map((note) => (
                <div
                  key={note.id}
                  className={`sidebar-note-item ${selectedNoteId === note.id ? 'selected' : ''}`}
                  onClick={() => selectNote(note.id)}
                >
                  <FileText size={14} className="note-icon-color" />
                  <div className="search-result-info">
                    <span className="search-result-title">{note.title || '未命名'}</span>
                    <span className="search-result-folder">{getFolderName(note.folderId)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 收藏夹 */}
      {!displayQuery && favoriteNotes.length > 0 && (
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
      {!displayQuery && (
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
      )}

      {/* 底部操作 */}
      <div className="sidebar-footer">
        <button className="new-note-btn" onClick={handleNewNote}>
          <Plus size={16} />
          <span>新建笔记</span>
        </button>
      </div>
    </div>
  );
}
