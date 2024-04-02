import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import http from '../config/axios.config';
import {IGenericResponse} from '../types/common';
import {IUser} from '../types/user';

/**
 * login
 */
interface ILoginBody {
	email: string;
	password: string;
}

const loginApi = async (body: ILoginBody) => {
	const res = await http.post<
		IGenericResponse<{ accessToken: string; account: IUser }>
	>('auth/sign-in', body);
	return res.data;
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: loginApi,
		onSuccess(data) {
			if (data.isSuccess) {
				queryClient.invalidateQueries(['fetch-user']);
			}
		},
	});
};


export const useLoginWithGoogle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (body: any) => {
			const res = await http.post<
				IGenericResponse<{ accessToken: string; account: IUser }>
			>('auth/sign-in-google', body);
			return res.data;
		},
		onSuccess(data) {
			if (data.isSuccess) {
				queryClient.invalidateQueries(['fetch-user']);
			}
		},
	})
}

/**
 * register
 */
interface IRegisterBody {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const registerApi = async (body: IRegisterBody) => {
	const res = await http.post<IGenericResponse>('auth/sign-up', body);
	
	return res.data;
};

export const useRegister = () =>
	useMutation({
		mutationFn: registerApi,
	});

/**
 * fetch user
 */
const fetchUserApi = async () => {
	const res = await http.get<IGenericResponse<{ account: IUser }>>('fetchUser');
	return res.data;
};

export const useFetchUser = () =>
	useQuery({
		queryKey: ['fetch-user'],
		queryFn: fetchUserApi,
	});

const logoutApi = async () => {
	const res = await http.post('auth/logout');
	return res.data;
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: logoutApi,
		onSettled() {
			localStorage.removeItem('auth_token');
			queryClient.removeQueries();
			window.location.replace('/login');
		},
	});
};
