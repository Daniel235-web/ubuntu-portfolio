'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
} from 'lucide-react';
import cls from 'classnames';

import { BackgroundImage } from '@/components/background-image';
import { Sidebar } from '@/components/sidebar';
import { ContextMenu } from './context-menu';
import { AppsDrawer } from './apps-drawer';
import { PasswordModal } from './password-modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  createFile,
  createDirectory,
} from '@/redux/features/file-system-slice';
import {
  openAppByTitle,
  openAppWithPath,
} from '@/redux/features/all-apps-slice';

interface DesktopProps {}

const Desktop = ({}: DesktopProps) => {
  const dispatch = useAppDispatch();
  const { backgroundImage } = useAppSelector((state) => state.backgroundImage);
  const fileSystem = useAppSelector((state) => state.fileSystem);

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFiles = (filesList: File[]) => {
    filesList.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          dispatch(
            createFile({
              path: '/home/daniel235/Desktop',
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const hasImage = filesArray.some((file) => file.type.startsWith('image/'));

    if (hasImage) {
      setPendingFiles(filesArray);
      setIsPasswordModalOpen(true);
    } else {
      processFiles(filesArray);
    }
  };

  const handlePasswordSuccess = () => {
    processFiles(pendingFiles);
    setPendingFiles([]);
    setIsPasswordModalOpen(false);
  };

  const handlePasswordClose = () => {
    setPendingFiles([]);
    setIsPasswordModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Desktop paths: direct children of /home/daniel235/Desktop
  const desktopPrefix = '/home/daniel235/Desktop/';
  const desktopItems = useMemo(() => {
    return Object.keys(fileSystem)
      .filter(
        (path) =>
          path.startsWith(desktopPrefix) &&
          path.slice(desktopPrefix.length).indexOf('/') === -1,
      )
      .map((path) => ({
        path,
        node: fileSystem[path],
      }));
  }, [fileSystem]);

  // File type icons
  const getIcon = (type: 'file' | 'directory', name: string) => {
    if (type === 'directory') {
      return (
        <Folder className="h-10 w-10 fill-orange-500 stroke-[1.5] text-orange-500" />
      );
    }
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
      return <ImageIcon className="h-10 w-10 stroke-[1.5] text-teal-300" />;
    }
    if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
      return <Music className="h-10 w-10 stroke-[1.5] text-pink-300" />;
    }
    if (ext === 'mp4' || ext === 'mkv' || ext === 'avi') {
      return <Video className="h-10 w-10 stroke-[1.5] text-indigo-300" />;
    }
    return <FileText className="h-10 w-10 stroke-[1.5] text-zinc-300" />;
  };

  // Double click handling
  const handleItemDoubleClick = (
    path: string,
    type: 'file' | 'directory',
    name: string,
  ) => {
    if (type === 'directory') {
      dispatch(openAppWithPath({ slug: 'files', path }));
    } else {
      const ext = name.split('.').pop()?.toLowerCase();
      if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') {
        dispatch(openAppWithPath({ slug: 'image-viewer', path }));
      } else if (ext === 'txt' || ext === 'md') {
        dispatch(openAppWithPath({ slug: 'text-editor', path }));
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCreateFolder = () => {
    let baseName = 'New Folder';
    let folderName = baseName;
    let count = 1;
    while (fileSystem[`/home/daniel235/Desktop/${folderName}`]) {
      folderName = `${baseName} (${count})`;
      count++;
    }
    dispatch(
      createDirectory({ path: '/home/daniel235/Desktop', name: folderName }),
    );
  };

  const handleCreateFile = () => {
    let baseName = 'untitled.txt';
    let fileName = baseName;
    let count = 1;
    while (fileSystem[`/home/daniel235/Desktop/${fileName}`]) {
      fileName = `untitled (${count}).txt`;
      count++;
    }
    dispatch(
      createFile({
        path: '/home/daniel235/Desktop',
        name: fileName,
        content: '',
      }),
    );
  };

  const handleOpenTerminal = () => {
    dispatch(openAppByTitle('terminal'));
  };

  const handleChangeBackground = () => {
    dispatch(openAppByTitle('settings'));
  };

  return (
    <div
      className="absolute inset-0 h-full w-full select-none overflow-hidden"
      onContextMenu={handleRightClick}
      onClick={() => setSelectedPath(null)}
    >
      <BackgroundImage backgroundImage={backgroundImage} />

      {/* Left Sidebar launcher dock */}
      <Sidebar />

      {/* Hidden input for file uploads onto the desktop */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,text/plain"
        multiple
      />

      {/* Desktop items layout (clean vertical column on the right side) */}
      <div
        className="absolute right-6 top-[50px] z-30 flex flex-col items-center justify-start gap-4 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {desktopItems.map(({ path, node }) => {
          const isSelected = selectedPath === path;
          return (
            <div
              key={path}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPath(path);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleItemDoubleClick(path, node.type, node.name);
              }}
              className={cls(
                'flex w-20 cursor-pointer select-none flex-col items-center justify-center rounded border border-transparent p-2 text-center transition hover:bg-white hover:bg-opacity-10',
                isSelected
                  ? 'bg-opacity-35 hover:bg-orange-650 border-orange-500 bg-orange-600 hover:bg-opacity-40'
                  : '',
              )}
            >
              {/* Icon */}
              <div className="mb-1.5 drop-shadow-md">
                {node.type === 'file' && node.imageSrc ? (
                  <div
                    className="h-10 w-10 rounded border border-zinc-700 bg-cover bg-center shadow"
                    style={{ backgroundImage: `url(${node.imageSrc})` }}
                  />
                ) : (
                  getIcon(node.type, node.name)
                )}
              </div>

              {/* Text label with a subtle drop shadow to remain visible on bright wallpapers */}
              <span
                className="line-clamp-2 break-all px-0.5 text-[10px] font-medium leading-tight text-white"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.9)' }}
              >
                {node.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Custom Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onCreateFolder={handleCreateFolder}
          onCreateFile={handleCreateFile}
          onOpenTerminal={handleOpenTerminal}
          onChangeBackground={handleChangeBackground}
          onUploadFile={() => fileInputRef.current?.click()}
        />
      )}
      {/* Applications Drawer */}
      <AppsDrawer />

      {/* Password Verification Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordClose}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
};

export { Desktop };
