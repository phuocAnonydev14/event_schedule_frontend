export interface IGenericResponse<T = any> {
  map(arg0: (item: any) => string): unknown;
  status: number;
  isSuccess: boolean;
  msg: string;
  data: T;
}

export interface ICardItem {
  title: string;
  banner: string;
}

export interface ISidebarOption {
  name: string;
  path: string;
  role?: Role[];
}

export interface IServiceItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  note: string;
}

export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface IRenterItem
  extends Omit<IServiceItem, 'name' | 'unit' | 'note'> {}

export interface IRenterItemPay {
  renters: IRenterItem[];
  totalAmount: number;
}
