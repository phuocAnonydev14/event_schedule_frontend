/**
 * get setting option in service
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import http from '../../../config/axios.config';
import { IGenericResponse } from '../../../types/common';
import { IBooking } from '../../../types/booking';

const getServiceStatistic = async (userId: string, userRole: string) => {
  const res =
    userRole === 'user'
      ? await http.get<IGenericResponse<{ orders: IBooking[] }>>(
          `/order/${userId}`,
        )
      : await http.get<IGenericResponse<{ orders: IBooking[] }>>(`/order`);
  return res.data;
};

export const useGetServiceStatistic = (userId: string, userRole: string) => {
  return useQuery({
    queryKey: ['get-service-statistic', userId, userRole],
    queryFn: () => getServiceStatistic(userId, userRole),
    enabled: !!userId,
  });
};

const editOrder = async ({ id, ...order }: Partial<IBooking>) => {
  const res = await http.patch<IGenericResponse>(`/order/${id}`, order);
  return res.data;
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editOrder,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-service-statistic']);
        toast.success('Cập nhật đơn hàng thành công!');
      } else {
        toast.error('Thất bại!');
      }
    },
  });
};
