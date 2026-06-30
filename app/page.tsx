'use client';

import { Ubuntu } from '@/components/ubuntu';
import { LockScreen } from '@/components/desktop/lock-screen';
import { useAppSelector } from '@/redux/hooks';

const Home = () => {
  const status = useAppSelector((state) => state.status);

  return (
    <main
      style={{
        filter: `brightness(${status.brightnessLevel / 100})`,
      }}
      className="font-ubuntu"
    >
      <div className="relative h-screen w-screen overflow-hidden">
        <Ubuntu />
        {status.isLocked && <LockScreen />}
      </div>
    </main>
  );
};

export default Home;
