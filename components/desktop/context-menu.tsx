'use client';

import React, { useRef } from 'react';
import {
  FolderPlus,
  FilePlus,
  Monitor,
  Terminal as TerminalIcon,
  Upload,
} from 'lucide-react';
import useOutsideClickHandler from '@/hooks/use-outside-click-handler';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onChangeBackground: () => void;
  onOpenTerminal: () => void;
  onUploadFile: () => void;
}

const ContextMenu = ({
  x,
  y,
  onClose,
  onCreateFolder,
  onCreateFile,
  onChangeBackground,
  onOpenTerminal,
  onUploadFile,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickHandler(menuRef, () => {
    onClose();
  });

  return (
    <div
      ref={menuRef}
      className="absolute z-50 min-w-[160px] rounded-md border border-zinc-700 bg-zinc-800 bg-opacity-95 py-1 font-sans text-xs text-zinc-100 shadow-2xl backdrop-blur-sm"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <button
        onClick={() => {
          onCreateFolder();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <FolderPlus className="h-4 w-4 text-zinc-400" />
        New Folder
      </button>
      <button
        onClick={() => {
          onCreateFile();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <FilePlus className="h-4 w-4 text-zinc-400" />
        New Document
      </button>
      <button
        onClick={() => {
          onUploadFile();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <Upload className="h-4 w-4 text-zinc-400" />
        Upload File
      </button>
      <hr className="my-1 border-zinc-700" />
      <button
        onClick={() => {
          onOpenTerminal();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <TerminalIcon className="h-4 w-4 text-zinc-400" />
        Open in Terminal
      </button>
      <button
        onClick={() => {
          onChangeBackground();
          onClose();
        }}
        className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <Monitor className="h-4 w-4 text-zinc-400" />
        Change Background
      </button>
    </div>
  );
};

export { ContextMenu };
