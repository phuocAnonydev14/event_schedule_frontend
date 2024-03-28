import { HTMLAttributes, ReactNode } from 'react';

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function PageWrapper({ children, ...passProps }: PageWrapperProps) {
  return <div {...passProps}>{children}</div>;
}

export default PageWrapper;
