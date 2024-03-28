import { ReactNode } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen justify-between items-center mt-[64px]">
        <div className="d-flex flex-col mx-auto w-full">
          <main className="min-h-screen container w-full flex mx-auto">
            <div className="container my-10">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
