'use client';

import { ReactNode, useState, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import cls from 'classnames';

import { Navbar } from './navbar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changePosition, zIndexApp } from '@/redux/features/all-apps-slice';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  zIndex: number;
}

const Window = ({ id, title, children, zIndex }: WindowProps) => {
  const dispatch = useAppDispatch();
  const apps = useAppSelector((state) => state.allApps);
  const app = apps.find((item) => item.id === id);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [deltaPosition, setDeltaPosition] = useState<{
    x: number;
    y: number;
  }>(app?.position || { x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStart: DraggableEventHandler = () => {
    setIsDragging(true);
  };

  const handleDrag: DraggableEventHandler = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const handleStop: DraggableEventHandler = () => {
    setIsDragging(false);
    dispatch(
      changePosition({
        id,
        position: deltaPosition,
      }),
    );
  };

  return (
    <Draggable
      handle=".handle"
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent"
      disabled={isMobile}
      position={isMobile || app?.maximized ? { x: 0, y: 0 } : app?.position}
    >
      <div
        className={cls(
          'absolute flex flex-col bg-zinc-800 shadow-lg',
          isDragging ? '' : 'transition-all duration-300 ease-out',
          isMobile || app?.maximized
            ? 'rounded-none'
            : 'left-20 top-10 rounded-lg',
          'overflow-hidden',
          isMobile
            ? 'h-full w-full'
            : app?.maximized
            ? 'h-full w-full'
            : app?.slug === 'calculator'
            ? 'h-3/4 w-3/4 md:h-2/4 md:w-1/4'
            : 'h-3/4 w-3/4',
        )}
        style={{
          top: isMobile ? '32px' : app?.maximized ? '32px' : '',
          left: isMobile ? '0px' : app?.maximized ? '58px' : '',
          right: isMobile || app?.maximized ? '0px' : '',
          bottom: isMobile ? '50px' : app?.maximized ? '0px' : '',
          overflow: isMobile || app?.maximized ? 'hidden' : '',
          width: isMobile
            ? '100vw'
            : app?.maximized
            ? 'calc(100vw - 58px)'
            : '',
          height: isMobile
            ? 'calc(100vh - 32px - 50px)'
            : app?.maximized
            ? 'calc(100vh - 32px)'
            : '',
          zIndex: app?.zIndex,
        }}
        onClick={(e) => {
          dispatch(zIndexApp(id));
        }}
      >
        <Navbar
          title={title}
          id={id}
          className={isMobile || app?.maximized ? '' : 'handle'}
        />
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </Draggable>
  );
};

export { Window };
