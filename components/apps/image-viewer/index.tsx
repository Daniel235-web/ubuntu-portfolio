'use client';

import React, { useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { openAppWithPath } from '@/redux/features/all-apps-slice';
import { setImage } from '@/redux/features/background-image-slice';

interface ImageViewerProps {
  id: string;
}

const ImageViewer = ({ id }: ImageViewerProps) => {
  const dispatch = useAppDispatch();
  const fileSystem = useAppSelector((state) => state.fileSystem);
  const apps = useAppSelector((state) => state.allApps);

  // Find this app's state to get activePath
  const thisApp = useMemo(() => apps.find((app) => app.id === id), [apps, id]);
  const activePath = thisApp?.activePath || '';

  // Get current node details
  const node = fileSystem[activePath];

  // Get all images in the filesystem for fallback gallery
  const allImages = useMemo(() => {
    return Object.keys(fileSystem)
      .filter((path) => {
        const item = fileSystem[path];
        return item.type === 'file' && !!item.imageSrc;
      })
      .map((path) => ({
        path,
        node: fileSystem[path],
      }));
  }, [fileSystem]);

  // Get sibling images in the same folder
  const siblings = useMemo(() => {
    if (!activePath) return [];

    // Find parent directory
    const parts = activePath.split('/');
    parts.pop();
    const parentPath = parts.join('/');
    const prefix = parentPath === '/' ? '/' : `${parentPath}/`;

    return Object.keys(fileSystem)
      .filter((path) => {
        // Must be in the same folder and be a file
        if (!path.startsWith(prefix) || path === parentPath) return false;
        const relative = path.slice(prefix.length);
        if (relative.includes('/')) return false;

        const siblingNode = fileSystem[path];
        if (siblingNode.type !== 'file') return false;

        // Check if image extension
        const ext = siblingNode.name.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'webp'].includes(ext || '');
      })
      .sort();
  }, [fileSystem, activePath]);

  // Find index of current image in siblings list
  const currentIndex = useMemo(() => {
    return siblings.indexOf(activePath);
  }, [siblings, activePath]);

  const handleNext = () => {
    if (siblings.length === 0) return;
    const nextIdx = (currentIndex + 1) % siblings.length;
    dispatch(
      openAppWithPath({ slug: 'image-viewer', path: siblings[nextIdx] }),
    );
  };

  const handlePrev = () => {
    if (siblings.length === 0) return;
    const prevIdx = (currentIndex - 1 + siblings.length) % siblings.length;
    dispatch(
      openAppWithPath({ slug: 'image-viewer', path: siblings[prevIdx] }),
    );
  };

  const handleSetWallpaper = () => {
    if (node?.imageSrc) {
      dispatch(setImage(node.imageSrc));
    }
  };

  if (!activePath || !node || node.type !== 'file' || !node.imageSrc) {
    return (
      <div className="flex h-full w-full flex-col overflow-y-auto bg-zinc-950 p-6 font-sans text-zinc-100">
        <h2 className="mb-2 text-lg font-semibold text-zinc-200">
          Image Gallery
        </h2>
        <p className="mb-6 text-xs text-zinc-500">
          Select an image file from the system to open and view it.
        </p>

        {allImages.length === 0 ? (
          <div className="flex flex-grow items-center justify-center text-sm text-zinc-600">
            No images found in the system
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {allImages.map(({ path, node: imgNode }) => (
              <button
                key={path}
                onClick={() =>
                  dispatch(openAppWithPath({ slug: 'image-viewer', path }))
                }
                className="group flex flex-col items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-2 transition hover:scale-105 hover:border-orange-500 hover:bg-zinc-800"
              >
                <div
                  className="h-20 w-20 rounded border border-zinc-700 bg-cover bg-center shadow-md"
                  style={{ backgroundImage: `url(${imgNode.imageSrc})` }}
                />
                <span className="line-clamp-2 w-full break-all text-[11px] text-zinc-400 group-hover:text-zinc-200">
                  {imgNode.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full select-none flex-col bg-zinc-950 font-sans text-zinc-100">
      {/* Title / Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
        <span className="max-w-[200px] truncate font-semibold sm:max-w-xs">
          {node.name}
        </span>

        {/* Set wallpaper button */}
        <button
          onClick={handleSetWallpaper}
          className="active:bg-zinc-650 flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-zinc-200 transition hover:bg-zinc-700"
        >
          <Monitor className="h-3.5 w-3.5 text-orange-400" />
          Set as Background
        </button>
      </div>

      {/* Main Image viewer area */}
      <div className="group relative flex flex-grow items-center justify-center overflow-hidden p-4">
        <img
          src={node.imageSrc}
          alt={node.name}
          className="max-h-full max-w-full rounded object-contain shadow-2xl"
          draggable={false}
        />

        {/* Navigation Arrows */}
        {siblings.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900 bg-opacity-50 p-2 text-zinc-100 opacity-0 shadow-lg transition hover:bg-opacity-80 active:bg-orange-600 group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900 bg-opacity-50 p-2 text-zinc-100 opacity-0 shadow-lg transition hover:bg-opacity-80 active:bg-orange-600 group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Sibling thumbnails preview strip */}
      {siblings.length > 1 && (
        <div className="flex h-16 items-center justify-center gap-2 overflow-x-auto border-t border-zinc-900 bg-zinc-900 p-2">
          {siblings.map((path, idx) => {
            const isCurrent = idx === currentIndex;
            const siblingNode = fileSystem[path];
            return (
              <button
                key={path}
                onClick={() =>
                  dispatch(openAppWithPath({ slug: 'image-viewer', path }))
                }
                className={`h-12 w-12 rounded border-2 bg-cover bg-center transition ${
                  isCurrent
                    ? 'scale-105 border-orange-500'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundImage: `url(${siblingNode.imageSrc})` }}
                title={siblingNode.name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { ImageViewer };
