import { NavbarItem } from '@nextui-org/react';
import { ReactNode } from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

interface NavItemProps extends LinkProps {
  children: ReactNode;
}

function NavItem({ children, to, ...passProps }: NavItemProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavbarItem isActive={!!match}>
      <Link {...passProps} to={to} color="foreground">
        {children}
      </Link>
    </NavbarItem>
  );
}

export default NavItem;
