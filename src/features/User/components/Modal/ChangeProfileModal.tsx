import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from '@nextui-org/react';
import * as Yup from 'yup';
import { FormProvider } from 'react-hook-form';
import { MdOutlineEdit } from 'react-icons/md';

import useFormWithYup from '../../../../hooks/useFormWithYup';
import CInput from '../../../../components/CInput';
import { ReactNode } from 'react';
import { useChangeProfile } from '../../../Admin/apis/user.api';
import { useFetchUser } from '../../../../apis/auth.api';
import { toast } from 'react-toastify';

const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('Vui lòng nhập trường này!'),
  lastName: Yup.string().required('Vui lòng nhập trường này!'),
  email: Yup.string()
    .required('Vui lòng nhập email!')
    .email('Email không hợp lệ!'),
});

const initValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

interface ModalChangeProfileProps extends Omit<ModalProps, 'children'> {
  onOpen: () => void;
  children?: ReactNode;
}

function ModalChangeProfile({
  isOpen,
  children,
  onOpenChange,
}: ModalChangeProfileProps) {
  const { data: dataUser } = useFetchUser();

  const methods = useFormWithYup(profileSchema, {
    defaultValues: initValues,
    values: {
      firstName: dataUser?.data?.account?.firstName ?? '',
      lastName: dataUser?.data?.account?.lastName ?? '',
      email: dataUser?.data?.account?.email ?? '',
      phoneNumber: dataUser?.data?.account?.phoneNumber ?? '',
    },
  });

  const { mutate: changeProfile } = useChangeProfile();

  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
    changeProfile(
      {
        userId: String(dataUser?.data.account.id),
        payload: values,
      },
      {
        onSuccess(data) {
          if (data.isSuccess) {
            toast.success('Thay đổi thông tin cá nhân thành công!');
            onOpenChange!(false);
            reset(initValues);
          } else {
            toast.error(data.msg || 'Thay đổi thất bại!');
          }
        },
      },
    );
  });

  return (
    <Modal
      onClose={() => {
        reset(initValues);
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Thay đổi thông tin cá nhân</ModalHeader>
            <ModalBody>
              <FormProvider {...methods}>
                <form onSubmit={submitHandler}>
                  <CInput name="firstName" placeholder="Nguyễn" label="Họ" />
                  <CInput name="lastName" placeholder="Văn A" label="Tên" />
                  <CInput
                    name="email"
                    placeholder="abc@gmail.com"
                    label="Email"
                  />
                  <CInput
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                    label="Số điện thoại"
                  />

                  <div className="text-end">
                    <Button variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      startContent={<MdOutlineEdit />}
                    >
                      Lưu
                    </Button>
                  </div>
                </form>
              </FormProvider>
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalChangeProfile;
