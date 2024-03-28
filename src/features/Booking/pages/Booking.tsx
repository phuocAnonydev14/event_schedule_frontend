import { FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { Button } from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

import useFormWithYup from '../../../hooks/useFormWithYup';
import CInput from '../../../components/CInput';
import CDatePicker from '../../../components/CDatePicker/CDatepicker';
import {
  useAllCategoriesService,
  useAllServicePack,
} from '../../Admin/apis/settingService.api';
import { ISelectOption } from '../../../types/common';
import CReactSelect from '../../../components/CReactSelect';
import TableBooking from '../components/TableBooking';
import { useTotalBill } from '../store/booking.store';
import NumberFormat from '../../../components/NumberFormat';

const bookingSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên!'),
  email: Yup.string().required('Vui lòng nhập địa chỉ!'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại!'),
  numberOfAttendes: Yup.number()
    .typeError('Số lượng khách phải là số!')
    .required('Vui lòng nhập số lượng khách!')
    .nullable(),
});

const initValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  numberOfAttendes: null,
  eventTime: null,
  service: null,
  servicePack: null,
};

function Booking() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useFormWithYup(bookingSchema, {
    defaultValues: initValues,
  });
  const { data: categoriesService } = useAllCategoriesService();
  const { data: listServicePack } = useAllServicePack();
  const totalBill = useTotalBill();

  const serviceOptions = useMemo(() => {
    if (categoriesService?.data.services.length) {
      return (
        categoriesService?.data.services.map((serviceItem) => ({
          label: serviceItem.title,
          value: serviceItem.id,
        })) || []
      );
    }
    return [];
  }, [categoriesService?.data]);

  const { handleSubmit, watch, setValue, trigger } = methods;
  const watchService = watch('service');

  const handleOnChange = (name: string) => (newValue: ISelectOption) => {
    setValue(name, newValue);
    trigger(name);
    searchParams.set(name, String(newValue.value));
    setSearchParams(searchParams);
  };

  const servicePackOptions = useMemo(() => {
    if (listServicePack?.data.services.length) {
      const targetService = listServicePack.data.services.find(
        (service) => service.id === watchService?.value,
      );
      return targetService?.settings.map((setting) => ({
        label: setting.name,
        value: setting.name,
      }));
    }
    return [];
  }, [categoriesService?.data, watchService]);

  // const { mutate: addBooking } = useAddBooking();
  const submitHandler = handleSubmit((values) => {
    navigate('/thanh-toan', {
      state: {
        submitValue: values,
      },
    });
  });

  useEffect(() => {
    if (searchParams.get('service') && serviceOptions.length) {
      setValue(
        'service',
        serviceOptions.find(
          (serviceOption) =>
            serviceOption.value === searchParams.get('service') || null,
        ),
      );
    }

    if (searchParams.get('service') && servicePackOptions?.length) {
      setValue(
        'servicePack',
        servicePackOptions.find(
          (serviceOption) =>
            serviceOption.value === searchParams.get('servicePack') || null,
        ),
      );
    }
  }, [serviceOptions.length, servicePackOptions?.length]);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={submitHandler}>
          <label>THÔNG TIN KHÁCH HÀNG</label>
          <div className="w-1/3">
            <CInput label="Tên khách hàng" name="name" id="name" />

            <CInput
              label="Địa chỉ email"
              name="email"
              id="email"
              type="email"
            />
            <CInput label="Số điện thoại" name="phone" id="phone" />

            <CInput
              label="Lượng khách dự kiến"
              name="numberOfAttendes"
              id="numberOfAttendes"
            />

            <CInput label="Địa chỉ" name="address" id="address" />

            <CDatePicker
              name="eventTime"
              placeholderText="Nhập thời gian tổ chức"
            />

            <CReactSelect
              id="service"
              name="service"
              placeholder="Chọn dịch vụ"
              // label="Dịch vụ"
              options={serviceOptions}
              // onChange={handleOnChange('service')}
              onChange={
                handleOnChange('service') as unknown as (
                  newValue: unknown,
                  actionMeta: ActionMeta<unknown>,
                ) => void
              }
            />

            <CReactSelect
              id="servicePack"
              name="servicePack"
              placeholder="Gói dịch vụ"
              // label="Dịch vụ"
              onChange={
                handleOnChange('servicePack') as unknown as (
                  newValue: unknown,
                  actionMeta: ActionMeta<unknown>,
                ) => void
              }
              options={servicePackOptions ?? []}
            />
          </div>

          <TableBooking />
          <div className="text-end mt-3">
            Tổng hóa đơn:
            <NumberFormat className="fw-bold text-3xl" value={totalBill} />
            <Button color="primary" className="mt-5" type="submit">
              Đặt đơn hàng
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Booking;
