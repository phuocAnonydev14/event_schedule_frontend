import { useQuery } from '@tanstack/react-query';
import http from '../config/axios.config';
import { IGenericResponse } from '../types/common';
import { IEvent } from '../types/event';

/**
 * Lấy ra tất cả
 * @returns
 */
const getAllEvent = async () => {
  const res = await http.get<IGenericResponse<{ events: IEvent[] }>>('event');
  return res.data;
};

export const useAllEvent = () => {
  return useQuery({
    queryKey: ['get-all-event'],
    queryFn: getAllEvent,
  });
};

/**
 * Lấy detail
 */
const getEventById = async (id?: string) => {
  const res = await http.get<IGenericResponse<{ event: IEvent }>>(
    `event/${id}`,
  );
  return res.data;
};

export const useGetEventById = (id?: string) => {
  return useQuery({
    queryKey: ['get-event', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
};
