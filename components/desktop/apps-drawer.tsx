'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { openApp } from '@/redux/features/all-apps-slice';
import { closeAppsDrawer } from '@/redux/features/status-slice';

const AppsDrawer = () => {
  const dispatch = useAppDispatch();
  const apps = useAppSelector((state) => state.allApps);
  const showAppsDrawer = useAppSelector((state) => state.status.showAppsDrawer);

  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Focus the search input when drawer opens
  useEffect(() => {
    if (showAppsDrawer && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showAppsDrawer]);

  // Filter apps based on search query
  const filteredApps = useMemo(() => {
    return apps.filter((app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [apps, searchQuery]);

  // Handle keyboard events (Escape to close, Enter to open first app, any other key to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeAppsDrawer());
      } else if (e.key === 'Enter') {
        if (filteredApps.length > 0) {
          dispatch(openApp(filteredApps[0].id));
          dispatch(closeAppsDrawer());
        }
      } else {
        // Focus search input when user starts typing (unless they are already focused or pressing hotkeys)
        if (
          searchInputRef.current &&
          document.activeElement !== searchInputRef.current &&
          !e.ctrlKey &&
          !e.altKey &&
          !e.metaKey &&
          e.key.length === 1
        ) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredApps, dispatch]);

  const handleLaunchApp = (id: string) => {
    dispatch(openApp(id));
    dispatch(closeAppsDrawer());
  };

  if (!showAppsDrawer) return null;

  return (
    <div
      onClick={() => dispatch(closeAppsDrawer())}
      className="absolute inset-0 z-50 flex flex-col items-center bg-zinc-950 bg-opacity-70 p-6 pt-16 text-zinc-100 backdrop-blur-md transition-all duration-300"
    >
      {/* Search Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mb-12 flex w-full max-w-md items-center rounded-full border border-zinc-800 bg-zinc-900 bg-opacity-80 px-4 py-2 shadow-lg transition-all focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"
      >
        <Search className="mr-2 h-4 w-4 text-zinc-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid of Apps */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex-grow overflow-y-auto px-4 pb-12"
      >
        {filteredApps.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-zinc-500">
            No matching applications found
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleLaunchApp(app.id)}
                className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-3 transition duration-150 hover:bg-white hover:bg-opacity-10 active:scale-95"
              >
                <div className="relative flex h-14 w-14 items-center justify-center transition duration-200 group-hover:scale-110">
                  <img
                    src={app.imageSrc}
                    alt={app.title}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
                <span className="line-clamp-2 w-full break-words text-center text-xs text-zinc-300 transition duration-150 group-hover:text-zinc-100">
                  {app.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { AppsDrawer };
