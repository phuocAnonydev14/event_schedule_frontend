import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { FormProvider } from 'react-hook-form';
import { MdOutlineEdit, MdOutlineDeleteOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import CInput from '../../../components/CInput';
import useFormWithYup from '../../../hooks/useFormWithYup';
import {
  useAddCategoryService,
  useAllCategoriesService,
  useDeleteCategory,
} from '../apis/settingService.api';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';

const serviceSchema = Yup.object().shape({
  title: Yup.string().required('Vui lòng nhập tên dịch vụ!'),
});

const initValue = {
  title: '',
};

function Service() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: addCategoryServiceMutate } = useAddCategoryService();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: allCategories } = useAllCategoriesService();

  const methods = useFormWithYup(serviceSchema, {
    defaultValues: initValue,
  });
  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
    addCategoryServiceMutate(values, {
      onSuccess(data) {
        if (data.isSuccess) {
          toast.success('Thêm thành công!');
          onOpenChange();
          reset(initValue);
        } else {
          toast.error('Thêm thất bại!');
        }
      },
    });
  });

  return (
    <>
      <TitleBorderStart>Quản lý dịch vụ</TitleBorderStart>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => reset(initValue)}
      >
        <ModalContent>
          <ModalHeader>Thêm dịch vụ</ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={submitHandler}>
                <CInput
                  id="title"
                  name="title"
                  label="Tên dịch vụ"
                  placeholder="Nhập tên dịch vụ"
                />

                <Button type="submit" color="primary">
                  Thêm
                </Button>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="max-w-[600px]">
        <div className="text-right">
          <Button onPress={onOpen} color="primary" className="mb-3">
            Thêm
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableColumn>Tên dịch vụ</TableColumn>
            <TableColumn>Khác</TableColumn>
          </TableHeader>
          <TableBody items={allCategories?.data.services ?? []}>
            {(category) => (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell className="w-[140px]">
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Chỉnh sửa">
                      <Button
                        //   onPress={() => onEdit(serviceItem.id)}
                        isIconOnly
                        aria-label="Chỉnh sửa"
                      >
                        <MdOutlineEdit />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Xóa">
                      <Button
                        onPress={() => {
                          deleteCategory(category.id, {
                            onSuccess(data) {
                              if (data.isSuccess) {
                                toast.success('Đã xóa thành công!');
                              } else {
                                toast.error('Xóa thất bại!');
                              }
                            },
                          });
                        }}
                        isIconOnly
                        color="danger"
                        aria-label="Xóa"
                      >
                        <MdOutlineDeleteOutline />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Service;
