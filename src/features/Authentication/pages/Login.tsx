import {Button, Card, CardBody, Checkbox} from '@nextui-org/react';
import {FormProvider} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

import CInput from '../../../components/CInput';
import useFormWithYup from '../../../hooks/useFormWithYup';
import {useLogin, useLoginWithGoogle} from '../../../apis/auth.api';
import ErrorMessage from '../../../components/ErrorMessage';
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.required('Vui lòng nhập email!')
		.email('Email không hợp lệ!'),
	password: Yup.string()
		.required('Vui lòng nhập mật khẩu!')
		.min(8, 'Mật khẩu phải có ít nhất 8 ký tự!'),
	// .matches(/.{8,}/, 'Mật khẩu phải có ít nhất 8 ký tự!'),
});

function Login() {
	const loginMutate = useLogin();
	const loginGoogleMutate = useLoginWithGoogle();
	const navigate = useNavigate();
	
	const methods = useFormWithYup(loginSchema, {
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});
	
	const {handleSubmit} = methods;
	
	const submitHandler = handleSubmit((values) => {
		loginMutate.mutate(values, {
			onSuccess(data) {
				if (data.isSuccess) {
					console.log('data-login', data);
					toast.success('Đăng nhập thành công!');
					navigate(
						data.data.account.role === 'admin'
							? '/setting-service-option'
							: '/',
						{replace: true},
					);
				} else {
					toast.error('Đăng nhập thất bại!');
				}
			},
		});
	});
	
	return (
		<Card className="min-h-[500px]">
			<CardBody>
				<h1 className="mt-4 mb-10 text-center font-bold text-3xl">Đăng nhập</h1>
				<FormProvider {...methods}>
					<form onSubmit={submitHandler} className="min-w-[360px]">
						<CInput name="email" placeholder="abc@gmail.com" label="Email"/>
						<CInput
							autoComplete="on"
							name="password"
							type="password"
							placeholder="Mật khẩu của bạn"
							label="Mật khẩu"
						/>
						{loginMutate.isSuccess && !loginMutate.data.isSuccess && (
							<ErrorMessage>{loginMutate.data?.msg}</ErrorMessage>
						)}
						<Checkbox>Ghi nhớ mật khẩu</Checkbox>
						<Button
							disabled={loginMutate.isLoading}
							type="submit"
							fullWidth
							color="primary"
							className="mt-10"
						>
							Đăng nhập
						</Button>
						<p className="mt-1 text-center">
							Bạn chưa có tài khoản?
							<Link className="ms-1 text-blue-500" to="/register">
								Đăng ký
							</Link>
						</p>
					</form>
				</FormProvider>
				<div className="mt-4">
					<GoogleLogin
						size="large"
						shape="circle"
						onSuccess={credentialResponse => {
							console.log(credentialResponse);
							const {email, sub}: any = jwtDecode(credentialResponse.credential as string);
							loginGoogleMutate.mutate({email, googleId: sub}, {
								onSuccess: () => {
									toast.success('Đăng nhập thành công!');
									navigate(
										'/',
										{replace: true},
									);
								}
							})
						}}
						onError={() => {
							console.log('Login Failed');
						}}
						useOneTap
					/>
				</div>
			</CardBody>
		</Card>
	);
}

export default Login;
