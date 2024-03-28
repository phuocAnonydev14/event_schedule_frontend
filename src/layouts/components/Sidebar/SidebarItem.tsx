import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { LinkProps } from 'react-router-dom';

interface ISidebarItemProps extends LinkProps {
  isActive?: boolean;
}

function SidebarItem({ children, to, ...passProps }: ISidebarItemProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-x-3.5 py-2 px-2.5 ${
          match ? 'bg-gray-100' : ''
        } text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
        {...passProps}
      >
        {children}
      </Link>
    </li>
  );
}

export default SidebarItem;
