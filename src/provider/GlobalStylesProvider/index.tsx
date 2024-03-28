import { ReactNode } from 'react';
import './index.css';

interface GlobalStylesProviderProps {
  children: ReactNode;
}

function GlobalStylesProvider({ children }: GlobalStylesProviderProps) {
  return <>{children}</>;
}

export default GlobalStylesProvider;
