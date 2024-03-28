import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import http from '../../../config/axios.config';
import { IGenericResponse, IServiceItem } from '../../../types/common';
import { IService, IServiceInfomation } from '../../../types/service';
import { MutationConfig } from '../../../config/react-query.config';

/**
 * Thêm
 * @param payload
 * @returns
 */
const addService = async (payload: Omit<IServiceItem, 'id'>) => {
  const res = await http.post<IGenericResponse<IServiceItem>>(
    'renter',
    payload,
  );
  return res.data;
};

export const useAddService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addService,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-all-services']);
      }
    },
  });
};

/**
 * Lấy ra tất cả services
 */
interface IGetAllServicesApi extends IServiceItem {
  id: string;
}

const getAllServicesApi = async () => {
  const res =
    await http.get<IGenericResponse<{ renters: IGetAllServicesApi[] }>>(
      'renter',
    );
  return res.data;
};

export const useAllService = () => {
  return useQuery({
    queryKey: ['get-all-services'],
    queryFn: getAllServicesApi,
  });
};

/**
 * Edit
 */
const editService = async ({ id, ...restService }: IServiceItem) => {
  const res = await http.patch<IGenericResponse<{ renter: IServiceItem }>>(
    `renter/${id}`,
    restService,
  );
  return res.data;
};

export const useEditService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editService,
    onSuccess() {
      queryClient.invalidateQueries(['get-all-services']);
    },
  });
};

/**
 * Lấy dịch vụ bằng ID
 */
const getServiceById = async (id?: string) => {
  const res = await http.get<IGenericResponse<{ renter: IServiceItem }>>(
    `renter/${id}`,
  );
  return res.data;
};

export const useGetServiceById = (id?: string) => {
  return useQuery({
    queryKey: ['get-service', String(id)],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};

/**
 *  Delete
 */
const deleteService = async (id: string) => {
  const res = await http.delete<IGenericResponse>(`renter/${id}`);
  return res.data;
};

export const useDeleteServiceById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-all-services']);
      }
    },
  });
};

/**
 * Thêm category dịch vụ
 */
const addCategoryService = async (body: { title: string }) => {
  const res = await http.post<IGenericResponse<{ service: IService }>>(
    'service',
    body,
  );
  return res.data;
};

export const useAddCategoryService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategoryService,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-all-categories-service']);
      }
    },
  });
};

/**
 * lấy tất cả categories dịch vụ
 */
const getAllCategoriesService = async () => {
  const res =
    await http.get<IGenericResponse<{ services: IService[] }>>('service');
  return res.data;
};

export const useAllCategoriesService = () => {
  return useQuery({
    queryKey: ['get-all-categories-service'],
    queryFn: getAllCategoriesService,
  });
};

const deleteCategory = async (id: string) => {
  const res = await http.delete<IGenericResponse>(`service/${id}`);
  return res.data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['get-all-categories-service']);
      }
    },
  });
};

export const addServicePack = async ({
  idService,
  payload,
}: {
  idService: string;
  payload: any;
}) => {
  const { data } = await http.post<IGenericResponse>(
    `/service/${idService}/setting`,
    payload,
  );

  return data;
};

export const useAddServicePack = (
  config?: MutationConfig<typeof addServicePack>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (dataRes) => {
      if (dataRes.isSuccess) {
        queryClient.invalidateQueries(['get-all-services-pack']);
      }
    },
    mutationFn: addServicePack,
    ...config,
  });
};

/**
 * Lấy ra tất cả services pack
 */
const getAllServicesPack = async () => {
  const res = await http.get<
    IGenericResponse<{ services: IServiceInfomation[] }>
  >('service/service_pack');
  return res.data;
};

export const useAllServicePack = () => {
  return useQuery({
    queryKey: ['get-all-services-pack'],
    queryFn: getAllServicesPack,
  });
};
