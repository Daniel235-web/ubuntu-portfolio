'use client';

import Image from 'next/image';

import { openApp } from '@/redux/features/all-apps-slice';
import { useAppDispatch } from '@/redux/hooks';

interface SidebarMenuItemProps {
  id: string;
  title: string;
  imageSrc: string;
  isOpen: boolean;
}

const SidebarMenuItem = ({
  imageSrc,
  title,
  id,
  isOpen,
}: SidebarMenuItemProps) => {
  const dispatch = useAppDispatch();
  const isCircular = title === 'About Me';

  return (
    <div
      className="relative m-1 flex w-auto cursor-pointer items-center justify-center rounded p-2 outline-none transition hover:bg-white hover:bg-opacity-10"
      onClick={() => dispatch(openApp(id))}
    >
      {isOpen && (
        <div className="absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white md:bottom-auto md:left-0.5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:h-1 md:w-1" />
      )}
      <Image
        src={imageSrc}
        alt={title}
        height={30}
        width={30}
        className={isCircular ? 'rounded-full' : ''}
      />
    </div>
  );
};

export { SidebarMenuItem };
