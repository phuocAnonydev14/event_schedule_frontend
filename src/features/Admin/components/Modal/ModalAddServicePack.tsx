import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import * as Yup from 'yup';
import { MdOutlineAdd } from 'react-icons/md';
import { FormProvider } from 'react-hook-form';
import TableBooking from '../../../Booking/components/TableBooking';
import CSelect from '../../../../components/CSelect';
import CInput from '../../../../components/CInput';
import {
  useAddServicePack,
  useAllCategoriesService,
} from '../../apis/settingService.api';
import useFormWithYup from '../../../../hooks/useFormWithYup';
import { useMemo, useState } from 'react';
import {
  useBookingCart,
  useBookingStoreActions,
} from '../../../Booking/store/booking.store';
import { toast } from 'react-toastify';

const postSchema = Yup.object().shape({
  service: Yup.string().required('Vui lòng nhập trường này!'),
  servicePack: Yup.string().required('Vui lòng nhập trường này!'),
});

const initValue = {
  service: '',
  servicePack: '',
};

function ModalAddServicePack() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useFormWithYup(postSchema, {
    defaultValues: initValue,
  });

  const bookingCart = useBookingCart();
  const { resetBookingCart } = useBookingStoreActions();

  const { mutate: addServicePack } = useAddServicePack();

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

  const { handleSubmit, reset } = methods;

  console.log('bookingCart', bookingCart);

  const submitHandler = handleSubmit((values) => {
    setErrorMessage('');

    if (bookingCart.length < 1 || !bookingCart.length) {
      setErrorMessage('Vui lòng chọn thiết bị!');
    } else {
      const newValues = {
        servicePack: values.servicePack,
        renters: bookingCart.map((renter) => ({
          id: renter.renter,
          price: renter.price,
          quantity: renter.quantity,
        })),
      };
      addServicePack(
        {
          idService: values.service,
          payload: newValues,
        },
        {
          onSuccess(dataRes) {
            if (dataRes.isSuccess) {
              toast.success('Thêm gói dịch vụ thành công!');
              reset(initValue);
              resetBookingCart();
            } else {
              toast.error('Thêm thất bại!');
            }
          },
        },
      );
    }
  });

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="text-white "
        startContent={
          <span className="text-white">
            <MdOutlineAdd size={20} />
          </span>
        }
      >
        Thêm gói dịch vụ
      </Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Thiết lập gói dịch vụ</ModalHeader>
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
                <TableBooking />
                {errorMessage && (
                  <p className="text-danger text-xs">{errorMessage}</p>
                )}

                <Button color="primary" type="submit">
                  Lưu
                </Button>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddServicePack;
