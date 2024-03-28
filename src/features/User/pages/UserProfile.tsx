import { Button, useDisclosure } from '@nextui-org/react';
import InfoItem from '../components/InfoItem';
import ModalEditProfile from '../components/Modal/ChangeProfileModal';
import { useFetchUser } from '../../../apis/auth.api';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';
import ModalChangePassword from '../components/Modal/ChangePassWordModal';

function UserProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: dataUser } = useFetchUser();

  console.log('dataUser', dataUser);

  return (
    <div>
      <TitleBorderStart>Thông tin cá nhân</TitleBorderStart>
      <div className="flex gap-2 mt-10">
        <div>
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt=""
            className="rounded-full transition-transform"
          />
        </div>

        <div className="flex flex-col ml-[40px] w-full">
          <InfoItem
            title="Email"
            initialValue={dataUser?.data?.account?.email}
          />
          <InfoItem
            title="Họ và tên"
            initialValue={`${dataUser?.data?.account?.firstName} ${dataUser?.data?.account?.lastName}`}
          />

          <InfoItem
            title="Số điện thoại"
            initialValue={dataUser?.data?.account?.phoneNumber}
          />

          <div className="flex gap-2">
            <Button className="mt-10 w-max" onPress={onOpen}>
              Chỉnh sửa thông tin
            </Button>
            <ModalChangePassword />
          </div>
        </div>
      </div>

      <ModalEditProfile
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        isOpen={isOpen}
      />
    </div>
  );
}

export default UserProfile;
