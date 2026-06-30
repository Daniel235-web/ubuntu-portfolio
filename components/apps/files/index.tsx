'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  FilePlus,
  FolderPlus,
  Home,
  Upload,
} from 'lucide-react';
import cls from 'classnames';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  createFile,
  createDirectory,
  deleteNode,
  renameNode,
} from '@/redux/features/file-system-slice';
import { openAppWithPath } from '@/redux/features/all-apps-slice';
import useOutsideClickHandler from '@/hooks/use-outside-click-handler';

interface FilesProps {
  id: string;
}

const Files = ({ id }: FilesProps) => {
  const dispatch = useAppDispatch();
  const fileSystem = useAppSelector((state) => state.fileSystem);

  const [currentPath, setCurrentPath] = useState<string>('/home/daniel235');
  const [history, setHistory] = useState<string[]>(['/home/daniel235']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemPath, setSelectedItemPath] = useState<string | null>(null);

  // Context menus
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    targetPath: string | null; // null means empty space
  } | null>(null);

  const [isRenamingPath, setIsRenamingPath] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');

  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check if any file is an image and prompt for password
    const hasImage = Array.from(files).some((file) => file.type.startsWith('image/'));
    if (hasImage) {
      const password = prompt('Enter owner password to upload images:');
      if (password !== 'ubuntu' && password !== 'daniel235') {
        alert('Incorrect password. Image upload denied.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
    }

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          dispatch(
            createFile({
              path: currentPath,
              name: file.name,
              content: isImage ? '' : result,
              imageSrc: isImage ? result : undefined,
            }),
          );
        }
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useOutsideClickHandler(contextMenuRef, () => {
    setContextMenu(null);
  });

  // Track path changes to clear selection
  useEffect(() => {
    setSelectedItemPath(null);
    setIsRenamingPath(null);
  }, [currentPath]);

  // Navigation helpers
  const navigateTo = (path: string) => {
    if (!fileSystem[path] || fileSystem[path].type !== 'directory') return;

    // Truncate future history if we were in the middle of history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const handleUp = () => {
    if (currentPath === '/home/daniel235') return;
    const parts = currentPath.split('/');
    parts.pop();
    const parentPath = parts.join('/');
    navigateTo(parentPath);
  };

  // Get direct children of current directory
  const getChildren = () => {
    const parentPrefix = currentPath === '/' ? '/' : `${currentPath}/`;
    return Object.keys(fileSystem)
      .filter((path) => {
        if (!path.startsWith(parentPrefix) || path === currentPath)
          return false;
        const relative = path.slice(parentPrefix.length);
        return relative.length > 0 && !relative.includes('/');
      })
      .map((path) => ({
        path,
        node: fileSystem[path],
      }));
  };

  const children = getChildren();
  const filteredChildren = children.filter((item) =>
    item.node.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // File type icons
  const getIcon = (type: 'file' | 'directory', name: string) => {
    if (type === 'directory') {
      return <Folder className="h-10 w-10 fill-orange-500 text-orange-500" />;
    }
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
      return <ImageIcon className="h-10 w-10 text-teal-400" />;
    }
    if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
      return <Music className="h-10 w-10 text-pink-400" />;
    }
    if (ext === 'mp4' || ext === 'mkv' || ext === 'avi') {
      return <Video className="h-10 w-10 text-indigo-400" />;
    }
    return <FileText className="h-10 w-10 text-zinc-300" />;
  };

  // Double click handling
  const handleItemDoubleClick = (
    path: string,
    type: 'file' | 'directory',
    name: string,
  ) => {
    if (type === 'directory') {
      navigateTo(path);
    } else {
      const ext = name.split('.').pop()?.toLowerCase();
      if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
        dispatch(openAppWithPath({ slug: 'image-viewer', path }));
      } else if (ext === 'txt' || ext === 'md') {
        dispatch(openAppWithPath({ slug: 'text-editor', path }));
      }
    }
  };

  // Context Menu handlers
  const handleContextMenu = (
    e: React.MouseEvent,
    targetPath: string | null,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      targetPath,
    });
  };

  // Mutators
  const handleCreateFolder = () => {
    setContextMenu(null);
    let baseName = 'New Folder';
    let folderName = baseName;
    let count = 1;
    while (fileSystem[`${currentPath}/${folderName}`]) {
      folderName = `${baseName} (${count})`;
      count++;
    }
    dispatch(createDirectory({ path: currentPath, name: folderName }));
  };

  const handleCreateFile = () => {
    setContextMenu(null);
    let baseName = 'untitled.txt';
    let fileName = baseName;
    let count = 1;
    while (fileSystem[`${currentPath}/${fileName}`]) {
      fileName = `untitled (${count}).txt`;
      count++;
    }
    dispatch(createFile({ path: currentPath, name: fileName, content: '' }));
  };

  const handleDelete = (path: string) => {
    setContextMenu(null);
    dispatch(deleteNode({ path }));
  };

  const startRename = (path: string, currentName: string) => {
    setContextMenu(null);
    setIsRenamingPath(path);
    setRenameValue(currentName);
  };

  const handleRenameSubmit = (path: string) => {
    if (!renameValue.trim()) {
      setIsRenamingPath(null);
      return;
    }
    const parts = path.split('/');
    parts.pop();
    const parentPath = parts.join('/');
    const newPath = `${parentPath}/${renameValue.trim()}`;

    if (newPath !== path && fileSystem[newPath]) {
      alert('A file or folder with that name already exists.');
      return;
    }

    dispatch(
      renameNode({
        oldPath: path,
        newPath,
        newName: renameValue.trim(),
      }),
    );
    setIsRenamingPath(null);
  };

  // Left sidebar shortcut folders
  const shortcuts = [
    {
      name: 'Home',
      path: '/home/daniel235',
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: 'Desktop',
      path: '/home/daniel235/Desktop',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
    {
      name: 'Documents',
      path: '/home/daniel235/Documents',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
    {
      name: 'Downloads',
      path: '/home/daniel235/Downloads',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
    {
      name: 'Pictures',
      path: '/home/daniel235/Pictures',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
    {
      name: 'Music',
      path: '/home/daniel235/Music',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
    {
      name: 'Videos',
      path: '/home/daniel235/Videos',
      icon: <Folder className="h-4 w-4 text-orange-400" />,
    },
  ];

  return (
    <div className="flex h-full w-full select-none bg-zinc-900 font-sans text-zinc-100">
      {/* Sidebar navigation */}
      <div className="flex w-1/4 min-w-[150px] flex-col gap-1 border-r border-zinc-800 bg-zinc-950 p-2">
        <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Places
        </div>
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.path}
            onClick={() => navigateTo(shortcut.path)}
            className={cls(
              'flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition hover:bg-zinc-800',
              currentPath === shortcut.path
                ? 'bg-orange-600 bg-opacity-30 font-medium text-orange-400'
                : 'text-zinc-300',
            )}
          >
            {shortcut.icon}
            {shortcut.name}
          </button>
        ))}
      </div>

      {/* Main Files Area */}
      <div
        className="relative flex flex-grow flex-col"
        onContextMenu={(e) => handleContextMenu(e, null)}
      >
        {/* Hidden input for file uploads */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,text/plain"
          multiple
        />
        {/* Nautilus Toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900 p-2">
          {/* Nav arrows */}
          <div className="flex items-center gap-1">
            <button
              disabled={historyIndex === 0}
              onClick={handleBack}
              className="rounded p-1 hover:bg-zinc-800 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              disabled={historyIndex === history.length - 1}
              onClick={handleForward}
              className="rounded p-1 hover:bg-zinc-800 disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              disabled={currentPath === '/home/daniel235'}
              onClick={handleUp}
              className="rounded p-1 hover:bg-zinc-800 disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>

          {/* Breadcrumb Path Bar */}
          <div className="flex min-w-0 flex-grow items-center overflow-x-auto whitespace-nowrap rounded bg-zinc-950 px-2 py-1 text-xs text-zinc-400">
            {currentPath.split('/').map((segment, idx, arr) => {
              if (segment === '' && idx === 0) return null;
              const segPath = arr.slice(0, idx + 1).join('/');
              return (
                <React.Fragment key={idx}>
                  <button
                    onClick={() => navigateTo(segPath || '/')}
                    className="px-1 font-semibold hover:text-zinc-100"
                  >
                    {segment || 'Root'}
                  </button>
                  {idx < arr.length - 1 && (
                    <span className="px-0.5 text-zinc-600">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 whitespace-nowrap rounded bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-orange-500"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload File
          </button>

          {/* Search Bar */}
          <div className="relative flex w-40 items-center md:w-56">
            <Search className="absolute left-2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded border border-zinc-800 bg-zinc-950 py-1 pl-7 pr-2 text-xs text-zinc-100 outline-none focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Files Grid View */}
        <div className="flex-grow overflow-auto p-4">
          {filteredChildren.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              This folder is empty
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {filteredChildren.map(({ path, node }) => {
                const isSelected = selectedItemPath === path;
                const isRenaming = isRenamingPath === path;

                return (
                  <div
                    key={path}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemPath(path);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(path, node.type, node.name);
                    }}
                    onContextMenu={(e) => handleContextMenu(e, path)}
                    className={cls(
                      'group flex cursor-pointer select-none flex-col items-center rounded border border-transparent p-2 text-center transition',
                      isSelected
                        ? 'bg-opacity-35 border-orange-500 bg-orange-600'
                        : 'hover:bg-zinc-800 hover:bg-opacity-50',
                    )}
                  >
                    {/* Thumbnail or Icon */}
                    <div className="relative mb-2">
                      {node.type === 'file' && node.imageSrc ? (
                        <div
                          className="h-10 w-10 rounded border border-zinc-700 bg-cover bg-center shadow-sm"
                          style={{ backgroundImage: `url(${node.imageSrc})` }}
                        />
                      ) : (
                        getIcon(node.type, node.name)
                      )}
                    </div>

                    {/* File/Folder Name */}
                    {isRenaming ? (
                      <input
                        type="text"
                        className="w-full rounded border border-orange-500 bg-zinc-950 px-1 py-0.5 text-center text-xs text-zinc-100 outline-none"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit(path);
                          if (e.key === 'Escape') setIsRenamingPath(null);
                        }}
                        onBlur={() => handleRenameSubmit(path)}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span className="line-clamp-2 break-all px-1 text-xs text-zinc-200">
                        {node.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Custom Context Menu */}
        {contextMenu && (
          <div
            ref={contextMenuRef}
            className="absolute z-50 min-w-[120px] rounded border border-zinc-700 bg-zinc-800 py-1 text-xs shadow-lg"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
            }}
          >
            {contextMenu.targetPath === null ? (
              <>
                <button
                  onClick={handleCreateFolder}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-zinc-700"
                >
                  <FolderPlus className="h-3.5 w-3.5 text-zinc-400" />
                  New Folder
                </button>
                <button
                  onClick={handleCreateFile}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-zinc-700"
                >
                  <FilePlus className="h-3.5 w-3.5 text-zinc-400" />
                  New Document
                </button>
                <button
                  onClick={() => {
                    setContextMenu(null);
                    fileInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-zinc-700"
                >
                  <Upload className="h-3.5 w-3.5 text-zinc-400" />
                  Upload File
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    const item = fileSystem[contextMenu.targetPath!];
                    handleItemDoubleClick(
                      contextMenu.targetPath!,
                      item.type,
                      item.name,
                    );
                    setContextMenu(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-zinc-700"
                >
                  Open
                </button>
                {!fileSystem[contextMenu.targetPath!]?.isSystem && (
                  <>
                    <button
                      onClick={() =>
                        startRename(
                          contextMenu.targetPath!,
                          fileSystem[contextMenu.targetPath!].name,
                        )
                      }
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-zinc-700"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-zinc-400" />
                      Rename
                    </button>
                    <hr className="my-1 border-zinc-700" />
                    <button
                      onClick={() => handleDelete(contextMenu.targetPath!)}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-red-400 hover:bg-zinc-700 hover:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Files };
