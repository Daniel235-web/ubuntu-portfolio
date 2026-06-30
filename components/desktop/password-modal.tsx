'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordModal = ({ isOpen, onClose, onSuccess }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setShowPassword(false);
      // Autofocus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword =
      process.env.NEXT_PUBLIC_OWNER_PASSWORD || 'Samuel@123';

    if (password === correctPassword) {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect owner password. Access denied.');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div
        className="animate-scale-in w-full max-w-sm transform rounded-2xl border border-zinc-800 bg-zinc-900 bg-opacity-95 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-orange-950/50 text-orange-500">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-100">
            Authentication Required
          </h3>
          <p className="mt-1.5 text-xs text-zinc-400">
            Please enter the owner password to upload image files.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-3 pr-10 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition duration-150 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-1.5 rounded-lg border border-red-900/30 bg-red-950/30 p-3 text-xs text-red-400">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-lg border border-zinc-800 bg-transparent py-2 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-lg bg-orange-600 py-2 text-xs font-semibold text-white transition hover:bg-orange-500 active:bg-orange-700"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { PasswordModal };
