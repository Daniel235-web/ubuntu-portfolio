'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Wifi, Battery, Volume2 } from 'lucide-react';
import Image from 'next/image';
import cls from 'classnames';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { unlockScreen } from '@/redux/features/status-slice';

const LockScreen = () => {
  const dispatch = useAppDispatch();
  const backgroundImage = useAppSelector(
    (state) => state.backgroundImage.backgroundImage,
  );
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // Listen to keyboard to trigger password screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showPasswordInput) {
        setShowPasswordInput(true);
      } else if (e.key === 'Enter') {
        handleUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Focus input when password screen is active
  useEffect(() => {
    if (showPasswordInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPasswordInput]);

  const handleUnlock = () => {
    // We accept any password or empty password to let visitors easily login
    dispatch(unlockScreen());
  };

  return (
    <div
      className="absolute inset-0 z-[100] flex h-screen w-screen flex-col justify-between overflow-hidden font-sans text-white"
      onClick={() => {
        if (!showPasswordInput) {
          setShowPasswordInput(true);
        }
      }}
    >
      {/* Blurred Wallpaper Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: showPasswordInput
            ? 'blur(25px) brightness(0.4)'
            : 'blur(0px) brightness(0.8)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Top Status Bar */}
      <div className="flex select-none items-center justify-between px-6 py-2 text-xs">
        <div>ubuntu</div>
        <div className="flex items-center gap-3">
          <Wifi className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-grow select-none flex-col items-center justify-center">
        {!showPasswordInput ? (
          /* Lock Screen View */
          <div
            onClick={() => setShowPasswordInput(true)}
            className="animate-fade-in flex cursor-pointer flex-col items-center text-center"
          >
            {/* Clock */}
            <h1 className="text-7xl font-light tracking-wide drop-shadow-md md:text-8xl">
              {timeStr}
            </h1>
            {/* Date */}
            <p className="mt-2 text-lg font-medium text-zinc-200 drop-shadow-sm">
              {dateStr}
            </p>
            {/* Unlock Hint */}
            <p className="mt-20 animate-pulse rounded-full bg-black bg-opacity-25 px-4 py-2 text-xs text-zinc-400 backdrop-blur-md">
              Click or press any key to unlock
            </p>
          </div>
        ) : (
          /* Login Screen View */
          <div className="animate-fade-in flex w-72 flex-col items-center text-center">
            {/* User Avatar */}
            <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-orange-500 shadow-xl">
              <Image
                src="/myImage.jpeg"
                alt="Samuel Emmanuel"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>

            {/* User Name */}
            <h2 className="text-lg font-bold drop-shadow-md">
              Samuel Emmanuel
            </h2>
            <p className="text-xs text-zinc-400">daniel235</p>

            {/* Password input form */}
            <div className="bg-opacity-65 relative mt-6 flex w-full items-center overflow-hidden rounded-md border border-zinc-700 bg-zinc-800 backdrop-blur transition-colors focus-within:border-orange-500">
              <input
                ref={inputRef}
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent px-3 py-2 pr-10 text-sm text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              />
              <button
                onClick={handleUnlock}
                className="absolute right-2 rounded-full bg-orange-600 p-1 transition hover:bg-orange-500 active:bg-orange-700"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-[10px] text-zinc-500">
              Hint: Press Enter or click the arrow to login
            </p>

            {/* Return to Lock Screen */}
            <button
              onClick={() => setShowPasswordInput(false)}
              className="mt-12 flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-zinc-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          </div>
        )}
      </div>

      {/* Bottom info spacer */}
      <div className="select-none py-4 text-center text-[10px] text-zinc-500">
        Ubuntu 22.04 LTS
      </div>
    </div>
  );
};

export { LockScreen };
