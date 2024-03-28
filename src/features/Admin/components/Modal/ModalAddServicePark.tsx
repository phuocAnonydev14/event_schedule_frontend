import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import * as Yup from 'yup';
import { FormProvider } from 'react-hook-form';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import CInput from '../../../../components/CInput';
import {
  useAddServicePack,
  useAllCategoriesService,
  useAllService,
} from '../../apis/settingService.api';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CSelect from '../../../../components/CSelect';
import useFormWithYup from '../../../../hooks/useFormWithYup';
import { toast } from 'react-toastify';

const postSchema = Yup.object().shape({
  service: Yup.string().required('Vui lòng nhập trường này!'),
  servicePack: Yup.string().required('Vui lòng nhập trường này!'),
});

const initValue = {
  service: '',
  servicePack: '',
};

interface ModalAddServiceParkProps extends Omit<ModalProps, 'children'> {
  onOpen: () => void;
  children?: ReactNode;
}

function ModalAddServicePark({
  isOpen,
  children,
  onOpenChange,
}: ModalAddServiceParkProps) {
  const { data: services } = useAllService();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [error, setError] = useState<string>();

  const [listItem, setListItem] = useState<
    { id: string; quantity: number; price: number }[]
  >([]);

  const methods = useFormWithYup(postSchema, {
    defaultValues: initValue,
  });

  const { data: allCategories } = useAllCategoriesService();

  const serviceOptions = useMemo(() => {
    if (allCategories?.data.services.length) {
      return allCategories?.data.services.map((serviceItem) => ({
        label: serviceItem.title,
        value: serviceItem.id,
      }));
    }
    return [];
  }, [allCategories?.data]);

  const handleCheckboxChange = (id: string) => {
    const isSelected = selectedItems.includes(id);
    setSelectedItems((prevSelectedItems) =>
      isSelected
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id],
    );
  };

  // tăng giảm số lượng thiết bị
  const setQuantityForItem = (id: string, quantity: number) => {
    const updatedList = listItem.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      return item;
    });
    setListItem(updatedList);
  };

  const { handleSubmit, reset } = methods;

  const { mutate: addServicePack } = useAddServicePack();

  const submitHandler = handleSubmit((values) => {
    setError('');
    if (selectedItems.length < 1) {
      setError('Vui lòng chọn thiết bị!');
    }
    const valueSubmit = {
      servicePack: values.servicePack,
      renters: listItem.filter((item) => selectedItems.includes(item.id)),
    };

    addServicePack(
      {
        idService: values.service,
        payload: valueSubmit,
      },
      {
        onSuccess(dataRes) {
          if (dataRes.status === 200) {
            toast.success('Thêm gói dịch vụ thành công!');
            reset(initValue);
            setListItem([]);
            onOpenChange!(false);
          } else {
            toast.error('Thêm thất bại!');
          }
        },
      },
    );
  });

  useEffect(() => {
    if (services?.data.renters?.length) {
      setListItem(
        services.data.renters.map((service) => ({
          id: service.id,
          price: Number(service.price),
          quantity: service.quantity,
        })),
      );
    }
  }, [services]);

  return (
    <div className="text-end mb-3">
      <Modal
        size="5xl"
        onClose={() => {
          reset(initValue);
          setListItem([]);
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
                  <form onSubmit={submitHandler}>
                    <CSelect
                      id="service"
                      name="service"
                      placeholder="Chọn dịch vụ"
                      label="Dịch vụ"
                      options={serviceOptions}
                    />
                    <CInput
                      id="servicePack"
                      name="servicePack"
                      placeholder="Nhập tên gói"
                      label="Tên gói"
                    />

                    {services && services.data.renters.length > 0 && (
                      <Table aria-label="Example table with dynamic content">
                        <TableHeader>
                          <TableColumn>Tên thiết bị</TableColumn>
                          <TableColumn>Đơn vị tính</TableColumn>
                          <TableColumn>
                            Giá tiền<span className="ms-1">(VNĐ)</span>
                          </TableColumn>
                          <TableColumn>Số lượng</TableColumn>
                          <TableColumn>Ghi chú</TableColumn>
                          <TableColumn>Khác</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {services.data.renters.map((serviceItem, index) => (
                            <TableRow key={serviceItem.id}>
                              <TableCell>
                                <Checkbox
                                  id={serviceItem.id}
                                  defaultChecked={selectedItems.includes(
                                    serviceItem.id,
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(serviceItem.id)
                                  }
                                />
                              </TableCell>
                              <TableCell>{serviceItem.name}</TableCell>
                              <TableCell>{serviceItem.unit}</TableCell>
                              <TableCell>{serviceItem.price}</TableCell>
                              <TableCell>
                                <div className="flex gap-1 items-center">
                                  <Button
                                    disabled={listItem[index]?.quantity === 1}
                                    size="sm"
                                    isIconOnly
                                    onClick={() =>
                                      setQuantityForItem(
                                        serviceItem.id,
                                        listItem[index].quantity - 1,
                                      )
                                    }
                                  >
                                    <AiOutlineMinus />
                                  </Button>
                                  <span className="w-7">
                                    {listItem[index]?.quantity}
                                  </span>
                                  <Button
                                    disabled={
                                      listItem[index]?.quantity ===
                                      serviceItem.quantity
                                    }
                                    size="sm"
                                    isIconOnly
                                    onClick={() =>
                                      setQuantityForItem(
                                        serviceItem.id,
                                        listItem[index].quantity + 1,
                                      )
                                    }
                                  >
                                    <AiOutlinePlus />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>{serviceItem.note}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {error && <p className="text-danger text-xs">{error}</p>}

                    <div className="flex gap-2 text-end mt-2">
                      <Button color="primary" type="submit">
                        Lưu
                      </Button>
                      <Button onPress={onClose}>Close</Button>
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

export default ModalAddServicePark;
