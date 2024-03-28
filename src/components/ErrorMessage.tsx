import { ReactNode } from 'react';

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
      <span>{children}</span>
    </p>
  );
}

export default ErrorMessage;
