import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import * as Yup from 'yup';
import { FormProvider } from 'react-hook-form';
import { MdOutlineEdit } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'react-toastify';

import useFormWithYup from '../../../../hooks/useFormWithYup';
import CInput from '../../../../components/CInput';
import { useChangePass } from '../../../Admin/apis/user.api';
import ErrorMessage from '../../../../components/ErrorMessage';

const changePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Vui lòng nhập trường này'),
  newPassword: Yup.string()
    .required('Vui lòng nhập trường này')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự!'),
  confirmPassword: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
    .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp!'),
});

const initValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ModalChangePassword() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useFormWithYup(changePassSchema, {
    defaultValues: initValues,
  });

  const { mutate: changeProfile } = useChangePass();

  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
    changeProfile(
      {
        payload: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      },
      {
        onSuccess(data) {
          if (data.isSuccess) {
            toast.success('Thay đổi mật khẩu thành công!');
            onOpenChange();
            reset(initValues);
          } else {
            toast.success('Thay đổi thất bại!');
            setErrorMessage(data.msg);
          }
        },
      },
    );
  });

  return (
    <div className="text-end mb-3">
      <Button className="mt-10 w-max" onPress={onOpen}>
        Đổi mật khẩu
      </Button>
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
              <ModalHeader>Thay đổi mật khẩu</ModalHeader>
              <ModalBody>
                <FormProvider {...methods}>
                  <form onSubmit={submitHandler}>
                    <CInput
                      id="oldPassword"
                      name="oldPassword"
                      placeholder="Nhập mật khẩu hiện tại"
                      label="Mật khẩu hiện tại"
                      type="password"
                    />
                    <CInput
                      id="newPassword"
                      name="newPassword"
                      placeholder="Nhập mật khẩu mới"
                      label="Mật khẩu mới"
                      type="password"
                    />
                    <CInput
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      label="Xác nhận mật khẩu"
                      type="password"
                    />

                    {errorMessage && (
                      <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}

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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalChangePassword;
