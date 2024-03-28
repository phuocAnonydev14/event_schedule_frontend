import {
  Button,
  Checkbox,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useGetSettingOptionService } from '../apis/booking.api';
import { useAllService } from '../../Admin/apis/settingService.api';
import { useBookingCart, useBookingStoreActions } from '../store/booking.store';
import { IRenter } from '../../../types/booking';
import NumberFormat from '../../../components/NumberFormat';

function TableBooking() {
  const [searchParams] = useSearchParams();
  const bookingCart = useBookingCart();
  const { setBookingCart, setInitBookingCart } = useBookingStoreActions();
  // const { data: categoriesService } = useAllCategoriesService();
  const { data: allServices, isLoading: isLoadingAllService } = useAllService();

  const { data: servicePackItem } = useGetSettingOptionService(
    searchParams.get('service') as string,
    searchParams.get('servicePack') as string,
  );

  useEffect(() => {
    if (servicePackItem?.data.setting.renters.length) {
      const initData: IRenter[] = servicePackItem?.data.setting.renters.map(
        (initItem) => ({
          renter: initItem.id,
          price: initItem.price,
          quantity: initItem.quantity,
        }),
      );

      setInitBookingCart(initData || []);
    }
  }, [servicePackItem?.data.setting.renters.length]);

  console.log('allServices.data.renters', allServices?.data.renters);

  return (
    <Table aria-label="Controlled table example with dynamic content">
      <TableHeader>
        <TableColumn>No.</TableColumn>
        <TableColumn>Tên thiết bị</TableColumn>
        <TableColumn>
          Đơn giá<span className="ms-1">(VNĐ)</span>
        </TableColumn>
        <TableColumn className="w-[160px]">Số lượng</TableColumn>
        <TableColumn>Số lượng còn</TableColumn>
        <TableColumn>Đơn vị tính</TableColumn>
        <TableColumn>Ghi chú</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoadingAllService}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={'No rows to display.'}
      >
        {!!allServices?.data.renters.length
          ? allServices.data.renters.map((serviceItem) => (
              <TableRow key={serviceItem.id ? serviceItem.id : serviceItem.id}>
                <TableCell>
                  <Checkbox
                    isSelected={
                      !!bookingCart.find(
                        (cartItem) => cartItem.renter === serviceItem.id,
                      )
                    }
                    onValueChange={(isSelected: boolean) => {
                      if (isSelected) {
                        setBookingCart({
                          renter: serviceItem.id,
                          price: serviceItem.price,
                          quantity: 1,
                        });
                      } else {
                        setBookingCart(
                          {
                            renter: serviceItem.id,
                            price: serviceItem.price,
                            quantity: 1,
                          },
                          true,
                        );
                      }
                    }}
                  >
                    Option
                  </Checkbox>
                </TableCell>
                <TableCell>{serviceItem.name}</TableCell>
                <TableCell>
                  <NumberFormat value={serviceItem.price} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center justify-between">
                    <Button
                      disabled={
                        bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        )?.renter !== serviceItem.id ||
                        bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        )?.quantity === 0
                      }
                      size="sm"
                      isIconOnly
                      onClick={() => {
                        const bookedItem = bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        );

                        setBookingCart({
                          renter: serviceItem.id,
                          price: serviceItem.price,
                          quantity: bookedItem?.quantity
                            ? bookedItem.quantity - 1
                            : 0,
                        });
                      }}
                    >
                      <AiOutlineMinus />
                    </Button>
                    <span className="flex-1 text-end">
                      {bookingCart.find(
                        (cartItem) => cartItem.renter === serviceItem.id,
                      )?.quantity || 0}
                    </span>
                    <Button
                      disabled={
                        bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        )?.renter !== serviceItem.id ||
                        bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        )?.quantity === serviceItem.quantity
                      }
                      onClick={() => {
                        const bookedItem = bookingCart.find(
                          (cartItem) => cartItem.renter === serviceItem.id,
                        );

                        setBookingCart({
                          renter: serviceItem.id,
                          price: serviceItem.price,
                          quantity: (bookedItem?.quantity || 0) + 1,
                        });
                      }}
                      size="sm"
                      isIconOnly
                    >
                      <AiOutlinePlus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{serviceItem.quantity}</TableCell>
                <TableCell>{serviceItem.unit}</TableCell>
                <TableCell>{serviceItem.note}</TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
}

export default TableBooking;
