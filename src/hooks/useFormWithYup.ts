import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const useFormWithYup = (
  schema: any,
  useFormProps?: UseFormProps<Yup.Asserts<any>>,
) => {
  return useForm({
    ...useFormProps,
    resolver: yupResolver(schema),
  });
};

export default useFormWithYup;
