import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useFetchUser } from '../../../apis/auth.api';
import { useEditOrder, useGetServiceStatistic } from '../apis/statistic.api';
import TitleBorderStart from '../../../components/TitleBorderStart/TitleBorderStart';
import ModalStatisticsDetail from '../components/ModalStatisticsDetail';
import { bookingStatus } from '../../../constants/bookingStatus.constant';
import { ChangeEvent } from 'react';
import NumberFormat from '../../../components/NumberFormat';

function ServiceStatistics() {
  const { data: dataUser } = useFetchUser();

  const { data: dataStatistic, isLoading } = useGetServiceStatistic(
    String(dataUser?.data.account.id),
    dataUser?.data.account.role,
  );
  const { mutate } = useEditOrder();

  const calculateTotalBill = (renters: any) => {
    return renters.reduce((prevValue: number, currValue: any) => {
      return prevValue + currValue.quantity * currValue.renter.price;
    }, 0);
  };

  const handleChangeStatus = (
    event: ChangeEvent<HTMLSelectElement>,
    id: string,
  ) => {
    mutate({
      id,
      status: event.target.value,
    });
  };

  return (
    <>
      <div>
        <TitleBorderStart>Thống kê đơn hàng</TitleBorderStart>

        <Table>
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn>Tên khách hàng</TableColumn>
            <TableColumn>SĐT</TableColumn>
            <TableColumn>Mã thanh toán</TableColumn>
            <TableColumn>Tổng hóa đơn</TableColumn>
            <TableColumn>Trạng thái đơn hàng</TableColumn>
            <TableColumn width={140}>Chi tiết</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={isLoading}
            items={dataStatistic?.data.orders || []}
          >
            {dataStatistic?.data.orders.length
              ? dataStatistic.data.orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${order.user.firstName} ${order.user.lastName}`}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.paypalId || order.id}</TableCell>
                  <TableCell>
                    <NumberFormat value={calculateTotalBill(order.renters)} />
                  </TableCell>
                  <TableCell>
                    {dataUser?.data.account.role === 'admin' ? (
                      <Select
                        label="Trạng thái"
                        size="sm"
                        onChange={(event) => {
                          handleChangeStatus(event, order.id as string);
                        }}
                        defaultSelectedKeys={[order.status || 'not-started']}
                      >
                        {bookingStatus.map((status) => (
                          <SelectItem
                            key={status.status}
                            value={status.status}
                          >
                            {status.name}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Chip
                        className={`${bookingStatus.find(
                          (statusItem) => statusItem.status === order.status,
                        )?.color}`}
                      >
                        {order.status || 'Chưa triển khai'}
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <ModalStatisticsDetail order={order} />
                  </TableCell>
                </TableRow>
              ))
              : []}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ServiceStatistics;
