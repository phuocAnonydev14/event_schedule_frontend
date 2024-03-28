import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { ISelectOption } from '../types/common';

interface CSelectProps extends Omit<SelectProps, 'children'> {
  name: string;
  options: ISelectOption[];
}

function CSelect({ name, options, ...passProps }: CSelectProps) {
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
          <Select
            label="Favorite Animal"
            placeholder="Select an animal"
            className="max-w-xs"
            {...passProps}
            {...field}
            name={name}
          >
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          {errors[name]?.message && (
            <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}

export default CSelect;
