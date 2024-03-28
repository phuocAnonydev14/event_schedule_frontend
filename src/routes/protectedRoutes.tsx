import { lazy } from 'react';
import { IRoute } from '../types/route';
import SidebarLayout from '../layouts/SidebarLayout';

const UserProfile = lazy(() => import('../features/User/pages/UserProfile'));
const Booking = lazy(() => import('../features/Booking/pages/Booking'));
const Admin = lazy(() => import('../features/Admin/pages/Admin'));
const SettingEvent = lazy(() => import('../features/Admin/pages/SettingEvent'));
const Post = lazy(() => import('../features/Admin/pages/Post'));
const Service = lazy(() => import('../features/Admin/pages/Service'));
const ServicePack = lazy(() => import('../features/Admin/pages/ServicePack'));
const SettingServiceOptions = lazy(
  () => import('../features/Admin/pages/SettingServiceOptions'),
);
const ServiceStatistics = lazy(
  () => import('../features/Statistics/pages/ServiceStatistics'),
);

const protectedRoutes: IRoute[] = [
  {
    page: <UserProfile />,
    path: 'profile',
    layout: SidebarLayout,
    role: ['user', 'admin'],
  },
  {
    page: <Admin />,
    path: 'admin',
    layout: SidebarLayout,
    role: ['admin'],
  },
  {
    page: <SettingServiceOptions />,
    path: 'setting-service-option',
    layout: SidebarLayout,
    role: ['admin', 'user'],
  },
  {
    page: <Post />,
    path: 'post',
    layout: SidebarLayout,
    role: ['admin'],
  },
  {
    page: <Service />,
    path: 'setting-service',
    layout: SidebarLayout,
    role: ['admin'],
  },
  {
    page: <SettingEvent />,
    path: 'setting-event',
    layout: SidebarLayout,
    role: ['admin'],
  },
  {
    page: <ServicePack />,
    path: 'setting-service-park',
    layout: SidebarLayout,
    role: ['admin'],
  },
  {
    page: <Booking />,
    path: 'booking',
    role: ['user'],
  },
  {
    page: <ServiceStatistics />,
    path: 'service-statistics',
    layout: SidebarLayout,
    role: ['user'],
  },
  {
    page: <ServiceStatistics />,
    path: 'service-statistics',
    layout: SidebarLayout,
    role: ['admin'],
  },
];

export default protectedRoutes;
