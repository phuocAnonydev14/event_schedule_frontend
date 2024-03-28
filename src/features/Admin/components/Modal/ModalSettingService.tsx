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
import { MdOutlineAdd, MdOutlineEdit } from 'react-icons/md';
import { Dispatch, ReactNode } from 'react';
import { toast } from 'react-toastify';

import useFormWithYup from '../../../../hooks/useFormWithYup';
import CInput from '../../../../components/CInput';
import { IServiceItem } from '../../../../types/common';
import {
  useAddService,
  useEditService,
  useGetServiceById,
} from '../../apis/settingService.api';

const settingServiceSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập trường này'),
  note: Yup.string(),
  unit: Yup.string().required('Vui lòng nhập trường này'),
  price: Yup.string().required('Vui lòng nhập trường này'),
  quantity: Yup.string().required('Vui lòng nhập trường này'),
});

const initValues = {
  name: '',
  unit: '',
  price: '',
  quantity: '',
  note: '',
};

interface ModalSettingServiceProps extends Omit<ModalProps, 'children'> {
  editId?: string;
  onOpen: () => void;
  children?: ReactNode;
  onSetEditId: Dispatch<React.SetStateAction<string>>;
}

function ModalSettingService({
  isOpen,
  onOpen,
  editId,
  children,
  onOpenChange,
  onSetEditId,
}: ModalSettingServiceProps) {
  const { data: editData } = useGetServiceById(editId);
  const { mutate: addService, isLoading: isAddLoading } = useAddService();
  const { mutate: editService } = useEditService();

  const methods = useFormWithYup(settingServiceSchema, {
    defaultValues: initValues,
    values: editId && {
      ...editData?.data.renter,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit((values: Omit<IServiceItem, 'id'>) => {
    if (editId) {
      editService(
        {
          id: editId,
          ...values,
        },
        {
          onSuccess(data) {
            if (data.isSuccess) {
              toast.success('Sửa thành công!');
              onOpenChange!(false);
            } else {
              toast.error('Sửa thất bại!');
            }
          },
        },
      );
    } else {
      addService(values, {
        onSuccess(data) {
          if (data.isSuccess) {
            toast.success('Thêm thành công!');
            onOpenChange!(false);
          } else {
            toast.error('Thêm thất bại!');
          }
        },
      });
    }
    reset(initValues);
  });

  return (
    <div className="text-end mb-3">
      <Button
        onPress={onOpen}
        color="primary"
        className="text-white"
        startContent={
          <span className="text-white">
            <MdOutlineAdd size={20} />
          </span>
        }
      >
        Thêm
      </Button>
      <Modal
        onClose={() => {
          reset(initValues);
          onSetEditId('');
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Thiết lập thiết bị</ModalHeader>
              <ModalBody>
                <FormProvider {...methods}>
                  <form onSubmit={onSubmit}>
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Nhập tên thiết bị"
                      label="Tên thiết bị"
                    />
                    <CInput
                      id="unit"
                      name="unit"
                      placeholder="Nhập đơn vị"
                      label="Đơn vị tính"
                    />
                    <CInput
                      id="price"
                      name="price"
                      placeholder="Nhập giá tiền"
                      label="Giá tiền"
                    />
                    <CInput
                      id="quantity"
                      name="quantity"
                      placeholder="Nhập số lượng"
                      label="Số lượng"
                    />
                    <CInput
                      id="note"
                      name="note"
                      placeholder="Nhập ghi chú"
                      label="Ghi chú"
                    />

                    <div className="text-end">
                      <Button variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        disabled={isAddLoading}
                        color="primary"
                        type="submit"
                        startContent={
                          editId ? <MdOutlineEdit /> : <MdOutlineAdd />
                        }
                      >
                        {editId ? 'Chỉnh sửa' : 'Thêm'}
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
    </div>
  );
}

export default ModalSettingService;
