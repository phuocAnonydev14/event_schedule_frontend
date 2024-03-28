import { NumberFieldAria } from 'react-aria';
import IServiceItem from './service';
import { IUser } from './user';

interface IBooking {
  renters: IServiceItem[];
  id?: string;
  id?: string;
}
export interface IRenter {
  renter: string;
  quantity: number;
  price: number;
}

export interface ICheckoutBody {
  renters: IRenter[];
  method: string;
  paypalId: string;
  address: string;
  phone: string;
  email: string;
  numberOfAttendes: number;
  eventTime: string;
}

type BookingStatusType =
  | 'not-started'
  | 'pending'
  | 'inprogressing'
  | 'finished'
  | 'cancel';

export interface IBookingStatus {
  name: string;
  status: BookingStatusType;
  color: string;
}

export interface IBooking extends ICheckoutBody {
  renters: IRenter[];
  event: string;
  address: string;
  phone: string;
  numberOfAttendes: number;
  eventTime: string;
  name: string;
  email: string;
  servicePack: string;
  totalAmount: Number;
  method: string;
  paypalId: string;
  user: IUser;
  status: string;
}
