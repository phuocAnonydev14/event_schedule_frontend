import { useMutation } from '@tanstack/react-query';
import http from '../../../config/axios.config';
import { IBooking } from '../../../types/booking';
import { IGenericResponse } from '../../../types/common';

const addOrder = async (bodyData: IBooking) => {
  const res = await http.post<IGenericResponse>('order', bodyData);
  return res.data;
};

export const useAddOrder = () => {
  return useMutation({
    mutationFn: addOrder,
  });
};
