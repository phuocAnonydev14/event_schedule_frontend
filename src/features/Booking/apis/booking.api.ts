import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../../../config/axios.config';
import { IGenericResponse } from '../../../types/common';
import { IEvent } from '../../../types/event';
import { IServicePackInfomation } from '../../../types/service';
import { MutationConfig } from '../../../config/react-query.config';
import { IBooking } from '../../../types/booking';

/**
 * get service
 * @returns
 */
const getListService = async () => {
  const res = await http.get<IGenericResponse<{ events: IEvent[] }>>('service');
  return res.data;
};

export const useAllEvent = () => {
  return useQuery({
    queryKey: ['get-list-service'],
    queryFn: getListService,
  });
};

/**
 * get setting option in service
 */

const getSettingOptionService = async (idService: string, param: string) => {
  const res = await http.get<
    IGenericResponse<{ setting: IServicePackInfomation }>
  >(`service/${idService}/setting?name=${param}`);
  return res.data;
};

export const useGetSettingOptionService = (
  idService: string,
  param: string,
) => {
  return useQuery({
    queryKey: ['get-setting-option-service', idService, param],
    queryFn: () => getSettingOptionService(idService, param),
    enabled: !!idService && !!param,
  });
};

export const addBooking = async ({
  idService,
  payload,
}: {
  idService: string;
  payload: IBooking;
}) => {
  const { data } = await http.post(`/service/${idService}/setting`, payload);

  return data;
};

export const useAddBooking = (config?: MutationConfig<typeof addBooking>) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (dataRes) => {
      if (dataRes.isFlag) {
        queryClient.invalidateQueries(['get-all-services-pack']);
      }
    },
    mutationFn: addBooking,
    ...config,
  });
};
