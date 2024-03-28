import { ReactNode } from 'react';
import APP_IMAGES from '../../assets/images';

interface SideBySideLayoutProps {
  children: ReactNode;
}

function SideBySideLayout({ children }: SideBySideLayoutProps) {
  return (
    <div className="fixed h-screen">
      <div className="flex h-full">
        <div className="h-full max-w-[50%]">
          <img
            className="object-cover h-full"
            src={APP_IMAGES.bgEvent}
            alt="image layout"
          />
        </div>
        <div className="flex m-auto">{children}</div>
      </div>
    </div>
  );
}

export default SideBySideLayout;
