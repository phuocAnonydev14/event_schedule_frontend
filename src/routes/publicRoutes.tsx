import { lazy } from 'react';
import { IRoute } from '../types/route';
import SideBySideLayout from '../layouts/SideBySideLayout';
import Contact from '../pages/Contact';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const Home = lazy(() => import('../pages/Home'));
const Checkout = lazy(() => import('../features/Checkout/pages/Checkout'));
const Login = lazy(() => import('../features/Authentication/pages/Login'));
const Register = lazy(
  () => import('../features/Authentication/pages/Register'),
);
const EventServices = lazy(
  () => import('../features/Booking/pages/EventServices'),
);
const EventServiceDetail = lazy(
  () => import('../features/Booking/pages/EventServiceDetail'),
);

const Introduce = lazy(() => import('../pages/Introduce'));

const publicRoutes: IRoute[] = [
  {
    page: <Home />,
    path: '/',
  },
  {
    page: <LandingPage />,
    path: 'landing-page',
  },
  {
    page: <Login />,
    path: 'login',
    layout: SideBySideLayout,
    isLogoutRequired: true,
  },
  {
    page: <Register />,
    path: 'register',
    layout: SideBySideLayout,
    isLogoutRequired: true,
  },
  {
    page: <EventServices />,
    path: 'dich-vu',
  },
  {
    page: <Introduce />,
    path: 'gioi-thieu',
  },
  {
    page: <Contact />,
    path: 'lien-he'
  },
  {
    page: <EventServiceDetail />,
    path: 'dich-vu/:id',
  },
  {
    page: <Checkout />,
    path: 'thanh-toan',
  },
];

export default publicRoutes;
