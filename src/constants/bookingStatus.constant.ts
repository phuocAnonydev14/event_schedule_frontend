import { IBookingStatus } from '../types/booking';
import { ISelectOption } from '../types/common';

export const bookingStatus: IBookingStatus[] = [
  {
    name: 'Chưa triển khai',
    status: 'not-started',
    color: 'bg-rose-500',
  },
  {
    name: 'Đang thực hiện',
    status: 'inprogressing',
    color: 'bg-blue-500',
  },
  {
    name: 'Tạm hoãn',
    status: 'pending',
    color: 'bg-orange-500',
  },
  {
    name: 'Hoàn thành',
    status: 'finished',
    color: 'bg-lime-500',
  },
  {
    name: 'Hủy',
    status: 'cancel',
    color: 'bg-orange-950',
  },
];

export const statusOptions: ISelectOption[] = bookingStatus.map((status) => ({
  label: status.name,
  value: status.status,
}));
