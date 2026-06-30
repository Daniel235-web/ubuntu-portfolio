'use client';

import React, { useState } from 'react';
import { Monitor, Volume2, Info, Sun, Check } from 'lucide-react';
import cls from 'classnames';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setImage } from '@/redux/features/background-image-slice';
import {
  setBrightnessLevel,
  setSoundLevel,
} from '@/redux/features/status-slice';

interface SettingsProps {
  id: string;
}

type Tab = 'background' | 'sound' | 'about';

const Settings = ({ id }: SettingsProps) => {
  const dispatch = useAppDispatch();
  const currentWallpaper = useAppSelector(
    (state) => state.backgroundImage.backgroundImage,
  );
  const status = useAppSelector((state) => state.status);
  const [activeTab, setActiveTab] = useState<Tab>('background');

  const wallpapers = [
    { name: 'Jellyfish Dark', path: '/images/wall-1.webp' },
    { name: 'Jellyfish Classic', path: '/images/wall-2.webp' },
    { name: 'Kinetic Kudu', path: '/images/wall-3.webp' },
    { name: 'Lunar Lobster', path: '/images/wall-4.webp' },
    { name: 'Mantic Minotaur', path: '/images/wall-5.webp' },
    { name: 'Noble Numbat', path: '/images/wall-6.webp' },
    { name: 'Oracular Oriole', path: '/images/wall-7.webp' },
    { name: 'Plucky Puffin', path: '/images/wall-8.webp' },
  ];

  return (
    <div className="flex h-full w-full select-none bg-zinc-900 font-sans text-zinc-100">
      {/* Sidebar menu */}
      <div className="flex w-1/3 min-w-[140px] flex-col gap-1 border-r border-zinc-800 bg-zinc-950 p-2">
        <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Settings
        </div>
        <button
          onClick={() => setActiveTab('background')}
          className={cls(
            'flex items-center gap-2.5 rounded px-3 py-2 text-left text-sm transition',
            activeTab === 'background'
              ? 'bg-orange-600 bg-opacity-30 font-medium text-orange-400'
              : 'hover:bg-zinc-850 text-zinc-300',
          )}
        >
          <Monitor className="h-4 w-4" />
          Background
        </button>
        <button
          onClick={() => setActiveTab('sound')}
          className={cls(
            'flex items-center gap-2.5 rounded px-3 py-2 text-left text-sm transition',
            activeTab === 'sound'
              ? 'bg-orange-600 bg-opacity-30 font-medium text-orange-400'
              : 'hover:bg-zinc-850 text-zinc-300',
          )}
        >
          <Volume2 className="h-4 w-4" />
          Sound & Brightness
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={cls(
            'flex items-center gap-2.5 rounded px-3 py-2 text-left text-sm transition',
            activeTab === 'about'
              ? 'bg-orange-600 bg-opacity-30 font-medium text-orange-400'
              : 'hover:bg-zinc-850 text-zinc-300',
          )}
        >
          <Info className="h-4 w-4" />
          About
        </button>
      </div>

      {/* Settings Content Area */}
      <div className="flex-grow overflow-auto bg-zinc-900 p-5">
        {/* Background tab */}
        {activeTab === 'background' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold">Desktop Background</h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                Select a wallpaper for your desktop screen.
              </p>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {wallpapers.map((wall) => {
                const isActive = currentWallpaper === wall.path;
                return (
                  <button
                    key={wall.path}
                    onClick={() => dispatch(setImage(wall.path))}
                    className={cls(
                      'hover:scale-102 relative flex flex-col items-center overflow-hidden rounded border-2 bg-zinc-950 shadow-md transition',
                      isActive
                        ? 'scale-102 border-orange-500'
                        : 'border-zinc-800',
                    )}
                  >
                    <div
                      className="h-20 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${wall.path})` }}
                    />
                    <div className="w-full truncate bg-zinc-950 px-2 py-1.5 text-center text-[10px] text-zinc-300">
                      {wall.name}
                    </div>
                    {isActive && (
                      <div className="absolute right-1 top-1 rounded-full bg-orange-600 p-1 text-white shadow">
                        <Check className="h-2.5 w-2.5 stroke-[4px]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sound & Brightness tab */}
        {activeTab === 'sound' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold">Sound & Brightness</h2>
              <p className="mt-0.5 font-sans text-xs text-zinc-400">
                Adjust system levels for audio output and display brightness.
              </p>
            </div>

            {/* Brightness slider */}
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Sun className="h-4 w-4 text-orange-400" /> Screen Brightness
              </span>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-xs text-zinc-500">0%</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={status.brightnessLevel}
                  onChange={(e) =>
                    dispatch(setBrightnessLevel(Number(e.target.value)))
                  }
                  className="h-1 flex-grow cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-orange-600"
                />
                <span className="w-8 text-right text-xs font-semibold text-zinc-300">
                  {status.brightnessLevel}%
                </span>
              </div>
            </div>

            {/* Sound slider */}
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Volume2 className="h-4 w-4 text-orange-400" /> System Volume
              </span>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-xs text-zinc-500">0%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={status.soundLevel}
                  onChange={(e) =>
                    dispatch(setSoundLevel(Number(e.target.value)))
                  }
                  className="h-1 flex-grow cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-orange-600"
                />
                <span className="w-8 text-right text-xs font-semibold text-zinc-300">
                  {status.soundLevel}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* About tab */}
        {activeTab === 'about' && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold">About System</h2>
              <p className="mt-0.5 font-sans text-xs text-zinc-400">
                Ubuntu specifications and device details.
              </p>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 text-xs">
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">Device Name</span>
                <span className="font-semibold">daniel235-portfolio</span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">Memory</span>
                <span className="font-semibold">16.0 GiB</span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">Processor</span>
                <span className="font-semibold">
                  AMD Ryzen 7 5800H with Radeon Graphics × 8
                </span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">Graphics</span>
                <span className="font-semibold">
                  NV167 / AMD Radeon Graphics
                </span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">Disk Capacity</span>
                <span className="font-semibold">512.0 GB</span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">OS Name</span>
                <span className="font-semibold">Ubuntu 22.04.3 LTS</span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">OS Type</span>
                <span className="font-semibold">64-bit</span>
              </div>
              <div className="border-zinc-850 flex items-center justify-between border-b px-4 py-3">
                <span className="text-zinc-400">GNOME Version</span>
                <span className="font-semibold">42.9</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-zinc-400">Developer</span>
                <span className="font-semibold text-orange-400">
                  Samuel Emmanuel
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Settings };
