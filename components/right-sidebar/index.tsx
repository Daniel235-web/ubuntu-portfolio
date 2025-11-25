'use client';

import Image from 'next/image';

import { Tooltip } from '@/components/tooltip';
import { openApp } from '@/redux/features/all-apps-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface RightSidebarProps {}

const RightSidebar = ({}: RightSidebarProps) => {
  const dispatch = useAppDispatch();
  const favoriteApps = useAppSelector((state) => state.allApps);

  return (
    <div className="absolute right-0 top-0 z-40 hidden h-full w-auto transform select-none flex-col items-center justify-start pt-7 duration-300 md:flex lg:flex">
      {favoriteApps.map((item) => (
        <Tooltip text={item.title} key={item.id} position="left">
          <div
            className="relative m-2 flex w-auto cursor-pointer items-center gap-0 rounded p-2 outline-none transition hover:bg-white hover:bg-opacity-10"
            onClick={() => dispatch(openApp(item.id))}
          >
            {item.isOpen && (
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-white" />
            )}
            <Image
              src={item.imageSrc}
              alt={item.title}
              height={45}
              width={45}
              className={item.title === 'About Me' ? 'rounded-full' : 'rounded'}
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export { RightSidebar };
