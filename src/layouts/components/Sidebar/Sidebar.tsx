import { ISidebarOption } from '../../../types/common';
import { useFetchUser } from '../../../apis/auth.api';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  options: ISidebarOption[];
}

function Sidebar({ options }: SidebarProps) {
  const { data: userData } = useFetchUser();

  return (
    <div
      id="docs-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="px-6">
        <a
          className="flex-none text-xl font-semibold dark:text-white"
          href="#"
          aria-label="Brand"
        >
          Brand
        </a>
      </div>
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          {options
            .filter(
              (optionItem) =>
                optionItem.role?.includes(userData?.data.account.role),
            )
            .map((option) => (
              <SidebarItem to={option.path} key={option.path}>
                {option.name}
              </SidebarItem>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
