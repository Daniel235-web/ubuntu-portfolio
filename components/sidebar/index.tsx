import cls from 'classnames';
import { Grid } from '@/components/icons';
import { SidebarMenuItem } from '@/components/sidebar-menu-item';
import { Tooltip } from '@/components/tooltip';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleAppsDrawer } from '@/redux/features/status-slice';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const dispatch = useAppDispatch();
  const favoriteApps = useAppSelector((state) =>
    state.allApps.filter((app) => app.isFavorite || app.isOpen),
  );
  const showAppsDrawer = useAppSelector((state) => state.status.showAppsDrawer);

  return (
    <div className="absolute bottom-0 left-0 z-40 flex h-[50px] w-full select-none flex-row items-center justify-center border-t border-black/20 bg-zinc-950/95 backdrop-blur-md px-4 duration-300 md:bottom-auto md:top-0 md:h-full md:w-auto md:flex-col md:justify-start md:border-r md:border-t-0 md:bg-black md:bg-opacity-20 md:pt-7 md:backdrop-blur-none">
      {favoriteApps.map((item) => (
        <Tooltip text={item.title} key={item.id} position="right">
          <SidebarMenuItem
            title={item.title}
            imageSrc={item.imageSrc}
            id={item.id}
            isOpen={item.isOpen}
          />
        </Tooltip>
      ))}
      <div
        onClick={() => dispatch(toggleAppsDrawer())}
        className={cls(
          'm-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded transition',
          showAppsDrawer
            ? 'bg-white bg-opacity-25 text-white'
            : 'text-zinc-300 hover:bg-white hover:bg-opacity-10 hover:text-white',
        )}
        style={{ marginTop: 'auto' }}
      >
        <Tooltip position="top" text="Show Applications">
          <div className="relative">
            <Grid />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export { Sidebar };
