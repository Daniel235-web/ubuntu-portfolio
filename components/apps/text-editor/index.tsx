'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Save, RefreshCw, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateFileContent } from '@/redux/features/file-system-slice';
import { closeApp } from '@/redux/features/all-apps-slice';

interface TextEditorProps {
  id: string;
}

const TextEditor = ({ id }: TextEditorProps) => {
  const dispatch = useAppDispatch();
  const fileSystem = useAppSelector((state) => state.fileSystem);
  const apps = useAppSelector((state) => state.allApps);

  // Find this app's state to get activePath
  const thisApp = useMemo(() => apps.find((app) => app.id === id), [apps, id]);
  const activePath = thisApp?.activePath || '';

  // Get current node details
  const node = fileSystem[activePath];

  // Local editor content
  const [editorContent, setEditorContent] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);

  // Sync local content when active file path changes
  useEffect(() => {
    if (node && node.type === 'file') {
      setEditorContent(node.content || '');
      setIsSaved(true);
    }
  }, [activePath, node]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    if (activePath) {
      dispatch(updateFileContent({ path: activePath, content: editorContent }));
      setIsSaved(true);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    }
  };

  const handleClose = () => {
    dispatch(closeApp(id));
  };

  if (!node || node.type !== 'file') {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm text-zinc-500">
        No text file loaded
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-zinc-900 font-mono text-zinc-100">
      {/* gedit header toolbar */}
      <div className="flex select-none items-center justify-between border-b border-zinc-800 bg-zinc-950 px-3 py-1.5 font-sans text-xs text-zinc-300">
        <div className="flex items-center gap-1.5">
          <span className="max-w-[200px] truncate font-semibold sm:max-w-xs">
            {node.name}
          </span>
          {!isSaved && (
            <span
              className="h-1.5 w-1.5 rounded-full bg-orange-500"
              title="Modified"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {showSaveToast && (
            <span className="flex animate-pulse items-center gap-1 text-[10px] text-green-400">
              <Check className="h-3 w-3" /> Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold transition ${
              isSaved
                ? 'cursor-default bg-zinc-800 text-zinc-500'
                : 'bg-orange-600 text-white hover:bg-orange-500 active:bg-orange-700'
            }`}
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
          <button
            onClick={handleClose}
            className="active:bg-zinc-750 rounded bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="flex-grow overflow-hidden bg-zinc-900 p-4">
        <textarea
          className="h-full w-full resize-none overflow-auto bg-transparent font-mono text-sm leading-relaxed text-zinc-200 outline-none"
          value={editorContent}
          onChange={handleTextChange}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export { TextEditor };
