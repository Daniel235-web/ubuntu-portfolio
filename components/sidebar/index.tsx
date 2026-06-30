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
    <div className="absolute left-0 top-0 z-40 flex h-full w-auto transform select-none flex-col items-center justify-start border-black border-opacity-30 bg-black bg-opacity-20 pt-7 duration-300">
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
