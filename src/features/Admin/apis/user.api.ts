import { useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../../../config/axios.config';
import { MutationConfig } from '../../../config/react-query.config';
import { IGenericResponse } from '../../../types/common';

/**
 * change profile
 */
interface IProfileBody {
  email: string;
  firstName: string;
  lastName: string;
}

export const changeProfile = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: IProfileBody;
}) => {
  const res = await http.patch<IGenericResponse>(`/user/${userId}`, payload);

  return res.data;
};

export const useChangeProfile = (
  config?: MutationConfig<typeof changeProfile>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['fetch-user']);
      }
    },
    mutationFn: changeProfile,
    ...config,
  });
};

/**
 * change profile
 */
interface IChangePasBody {
  oldPassword: string;
  newPassword: string;
}

export const changePass = async ({ payload }: { payload: IChangePasBody }) => {
  const res = await http.post('auth/change-password', payload);

  return res.data;
};

export const useChangePass = (config?: MutationConfig<typeof changePass>) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess(data) {
      if (data.isSuccess) {
        queryClient.invalidateQueries(['fetch-user']);
      }
    },
    mutationFn: changePass,
    ...config,
  });
};
