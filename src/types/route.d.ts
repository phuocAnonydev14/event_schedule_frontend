import { ReactNode } from 'react';
import { Role } from './user';

export interface IRoute {
  title?: string | React.Element | ReactNode;
  path: string;
  layout?: React.Component | FC | JSX.Element | null;
  params?: string;
  page: ReactNode | JSX.Element | React.LazyExoticComponent<FC<{ any }>> | FC;
  isLogoutRequired?: boolean;
  role?: Role[];
}
