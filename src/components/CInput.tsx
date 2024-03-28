import { Input, InputProps } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface CInputProps extends InputProps {
  name: string;
}

function CInput({ name, ...passProps }: CInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col mb-3">
          <Input {...field} {...passProps} />

          {errors[name]?.message && (
            <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}

export default CInput;
