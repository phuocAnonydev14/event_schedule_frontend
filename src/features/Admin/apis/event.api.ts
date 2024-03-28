import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../../../config/axios.config';
import { IGenericResponse } from '../../../types/common';
import { IEvent } from '../../../types/event';
import { toast } from 'react-toastify';

const addEvent = async (payload: IEvent) => {
  const res = await http.post<IGenericResponse>('event', payload);
  return res.data;
};

export const useAddEvent = () => {
  return useMutation({
    mutationFn: addEvent,
  });
};

/**
 * Xoa event
 */
const deleteEventById = async (id: string) => {
  const res = await http.delete<IGenericResponse>(`event/${id}`);
  return res.data;
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEventById,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-all-event']);
        toast.success('Xóa thành công!');
      } else {
        toast.error('Xóa thất bại!');
      }
    },
  });
};
