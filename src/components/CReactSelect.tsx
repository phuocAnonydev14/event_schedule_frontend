import { Controller, useFormContext } from 'react-hook-form';
import Select, { Props } from 'react-select';
import { ISelectOption } from '../types/common';
import ErrorMessage from './ErrorMessage';

interface CSelectProps extends Props {
  name: string;
  options: ISelectOption[];
}

function CReactSelect({ name, options, ...passProps }: CSelectProps) {
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
          <Select options={options} {...field} {...passProps} />

          {errors[name]?.message && (
            <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}

export default CReactSelect;
