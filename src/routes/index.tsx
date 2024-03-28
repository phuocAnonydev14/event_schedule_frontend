import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { IRoute } from '../types/route';
import DefaultLayout from '../layouts/DefaultLayout';
import { FC, Fragment, ReactNode, Suspense } from 'react';
import PageWrapper from '../pages/PageWrapper';
import publicRoutes from './publicRoutes';
import { Spinner } from '@nextui-org/react';
import PageNotFound from '../pages/PageNotFound';
import { useFetchUser } from '../apis/auth.api';
import protectedRoutes from './protectedRoutes';
import { Role } from '../types/user';

interface LogoutRequiredProps {
  isAuth?: boolean;
  isRequired?: boolean;
  children: ReactNode;
}

const LogoutRequired: FC<LogoutRequiredProps> = ({
  isAuth,
  children,
  isRequired,
}) => {
  if (isAuth && isRequired) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};

const renderRoutes = (routes: IRoute[], isAuth?: boolean, userRole?: Role) => {
  return routes.map((route) => {
    let Layout;
    if (route.layout === undefined) {
      Layout = DefaultLayout;
    } else if (route.layout === null) {
      Layout = Fragment;
    } else {
      Layout = route.layout;
    }

    let { path } = route;

    if (route.params) {
      path = `${route.path}/${route.params}`;
    }

    return (
      <Route
        key={route.path}
        path={path}
        element={
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LogoutRequired
                isAuth={isAuth}
                isRequired={route.isLogoutRequired}
              >
                {!route.role?.length ||
                userRole === 'admin' ||
                (route.role?.length &&
                  !!route.role?.find((item) => item === userRole)) ||
                !isAuth ? (
                  <PageWrapper title={route.title}>{route.page}</PageWrapper>
                ) : (
                  <Navigate to="/" />
                )}
              </LogoutRequired>
            </Suspense>
          </Layout>
        }
      />
    );
  });
};

export const PublicRouter = () => {
  return <Outlet />;
};

interface IPrivateRouterProps {
  isAuth: boolean;
}

export const PrivateRouter: FC<IPrivateRouterProps> = ({ isAuth }) => {
  if (!isAuth) return <Navigate to="/" />;

  return <Outlet />;
};

export default function AppRouter() {
  const { data: userData } = useFetchUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter />}>
          {renderRoutes(publicRoutes, userData?.isSuccess)}
        </Route>

        {!!userData?.isSuccess && (
          <Route element={<PrivateRouter isAuth={!!userData?.isSuccess} />}>
            {renderRoutes(
              protectedRoutes,
              userData?.isSuccess,
              userData?.data.account.role,
            )}
          </Route>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
