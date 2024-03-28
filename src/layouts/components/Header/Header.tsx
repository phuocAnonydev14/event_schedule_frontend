import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import NavItem from './NavItem';
import { useFetchUser, useLogout } from '../../../apis/auth.api';
import logo from "../../../assets/images/logo.png"
const navOptions = [
  {
    title: 'Trang chủ',
    url: '/',
  },
  {
    title: 'Dịch vụ',
    url: '/dich-vu',
  },
  {
    title: 'Giới thiệu',
    url: '/gioi-thieu',
  },
  {
    title: ' Liên hệ',
    url: '/lien-he',
  },
];

function Header() {
  const { data: userData, isLoading: isLoadingUser } = useFetchUser();
  const logoutMutate = useLogout();

  const UserOptions = useMemo(() => {
    if (
      userData?.data?.account?.role &&
      userData?.data?.account?.role === 'admin'
    ) {
      return {
        title: 'Quản lý',
        url: '/setting-service-option',
      };
    }
    return {
      title: 'Thông tin cá nhân',
      url: '/profile',
    };
  }, [userData?.data?.account?.role]);

  return (
    <Navbar isBordered maxWidth="full" className="fixed bg-blue-800" >
      <NavbarBrand>
        {/* <p className="font-bold text-inherit">LOGO</p> */}
        <img src={logo} className='w-[110px] ' alt="" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-16 text-white" justify="center">
        {navOptions.map((navItem) => (
          <NavItem to={navItem.url} key={navItem.url}>
            {navItem.title}
          </NavItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          to={userData?.isSuccess ? '/booking' : '/login'}
          as={Link}
          startContent={<MdOutlineCalendarToday />}
          color="primary"
          className=' bg-white text-black'
        >
          Đặt lịch
        </Button>

        {!isLoadingUser && (
          <>
            {userData?.isSuccess ? (
              <>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">
                        {userData.data.account.email}
                      </p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      <Link to={UserOptions.url}>{UserOptions.title}</Link>
                    </DropdownItem>
                    <DropdownItem
                      onPress={() => logoutMutate.mutate()}
                      key="logout"
                      color="danger"
                    >
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <Button color="default" to="/login" as={Link}>
                Đăng nhập
              </Button>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
