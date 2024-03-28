import { FC, HTMLAttributes, ReactNode } from 'react';

interface TitleBorderStartProps extends HTMLAttributes<HTMLDivElement> {
  children: string | ReactNode;
}

const TitleBorderStart: FC<TitleBorderStartProps> = ({ children }) => {
  return (
    <div className="border-l-4 border-solid border-blue-400 h-8 mb-8">
      <h4 className="ms-3 mb-3 text-blue-400 text-3xl font-semibold">
        {children}
      </h4>
    </div>
  );
};

export default TitleBorderStart;
