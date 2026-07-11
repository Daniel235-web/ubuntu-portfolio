'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2 } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { unlockScreen } from '@/redux/features/status-slice';

const LockScreen = () => {
  const dispatch = useAppDispatch();
  const backgroundImage = useAppSelector(
    (state) => state.backgroundImage.backgroundImage,
  );
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
      setDateStr(
        now.toLocaleDateString([], {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to keyboard to trigger unlock
  useEffect(() => {
    const handleKeyDown = () => {
      handleUnlock();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleUnlock = () => {
    dispatch(unlockScreen());
  };

  return (
    <div
      className="absolute inset-0 z-[100] flex h-screen w-screen flex-col justify-between overflow-hidden font-sans text-white cursor-pointer select-none"
      onClick={handleUnlock}
    >
      {/* Wallpaper Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.8)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 text-xs">
        <div>ubuntu</div>
        <div className="flex items-center gap-3">
          <Wifi className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="animate-fade-in flex flex-col items-center text-center">
          {/* Clock */}
          <h1 className="text-7xl font-light tracking-wide drop-shadow-md md:text-8xl">
            {timeStr}
          </h1>
          {/* Date */}
          <p className="mt-2 text-lg font-medium text-zinc-200 drop-shadow-sm">
            {dateStr}
          </p>
          {/* Unlock Hint */}
          <p className="mt-20 animate-pulse rounded-full bg-black bg-opacity-25 px-5 py-2.5 text-xs text-zinc-300 backdrop-blur-md border border-zinc-800">
            Click anywhere or press any key to enter
          </p>
        </div>
      </div>

      {/* Bottom info spacer */}
      <div className="py-4 text-center text-[10px] text-zinc-500">
        Ubuntu 22.04 LTS
      </div>
    </div>
  );
};

export { LockScreen };
