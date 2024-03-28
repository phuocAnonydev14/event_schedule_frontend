import { Button, Card, CardBody, Checkbox } from '@nextui-org/react';
import { FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

import CInput from '../../../components/CInput';
import useFormWithYup from '../../../hooks/useFormWithYup';
import { useRegister } from '../../../apis/auth.api';
import ErrorMessage from '../../../components/ErrorMessage';

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('Vui lòng nhập trường này!'),
  lastName: Yup.string().required('Vui lòng nhập trường này!'),
  email: Yup.string()
    .required('Vui lòng nhập email!')
    .email('Email không hợp lệ!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự!'),
  passwordConfirm: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp!'),
});

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const registerMutate = useRegister();

  const methods = useFormWithYup(registerSchema, {
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit } = methods;

  const submitHandler = handleSubmit((values) => {
    registerMutate.mutate(values, {
      onSuccess(data) {
        console.log('data', data);

        if (data.isSuccess) {
          toast.success('Đăng ký tài khoản thành công!');
          navigate('/login', { replace: true });
        } else {
          toast.success('Đăng ký thất bại!');
          setErrorMessage(data.msg);
        }
      },
    });
  });

  return (
    <Card className="min-h-[500px]">
      <CardBody>
        <h1 className="mt-4 mb-10 text-center font-bold text-3xl">
          Đăng ký tài khoản
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={submitHandler} className="min-w-[360px]">
            <CInput name="firstName" placeholder="Nguyễn" label="Họ" />
            <CInput name="lastName" placeholder="Văn A" label="Tên" />
            <CInput name="email" placeholder="abc@gmail.com" label="Email" />
            <CInput
              autoComplete="on"
              name="password"
              type="password"
              placeholder="Mật khẩu của bạn"
              label="Mật khẩu"
            />
            <CInput
              autoComplete="on"
              name="passwordConfirm"
              type="password"
              placeholder="Nhập lại mật khẩu"
              label="Mật khẩu bạn vừa nhập"
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Checkbox>Ghi nhớ mật khẩu</Checkbox>
            <Button
              disabled={registerMutate.isLoading}
              type="submit"
              fullWidth
              color="primary"
              className="mt-10"
            >
              Đăng ký
            </Button>
            <p className="mt-1 text-center">
              Bạn đã có tài khoản?
              <Link className="ms-1 text-blue-500" to="/login">
                Đăng nhập
              </Link>
            </p>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}

export default Register;
