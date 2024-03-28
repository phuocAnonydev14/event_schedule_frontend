import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import { ISidebarOption } from '../../types/common';

interface SidebarLayoutProps {
  children: ReactNode;
}

const sidebarItems: ISidebarOption[] = [
  {
    name: 'Quản lý thiết bị',
    path: '/setting-service-option',
    role: ['admin'],
  },

  {
    name: 'Đăng bài',
    path: '/post',
    role: ['admin'],
  },
  {
    name: 'Thêm dịch vụ',
    path: '/setting-service',
    role: ['admin'],
  },
  {
    name: 'Quản lý bài đăng',
    path: '/setting-event',
    role: ['admin'],
  },
  {
    name: 'Quản lý gói dịch vụ',
    path: '/setting-service-park',
    role: ['admin'],
  },
  {
    name: 'Thống kê đơn hàng',
    path: '/service-statistics',
    role: ['user'],
  },
  {
    name: 'Thống kê đơn hàng',
    path: '/service-statistics',
    role: ['admin'],
  },
  {
    name: 'Thông tin cá nhân',
    path: '/profile',
    role: ['admin', 'user'],
  },
];

function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative mx-auto z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] flex">
        <Sidebar options={sidebarItems} />

        <div className="sm:ml-64 flex-1 my-[100px] min-h-screen mb-0">
          <div className="h-full flex flex-col justify-between">
            <div className="mb-52">{children}</div>
            {/* <Footer /> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default SidebarLayout;
