import { FC, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import './CDatePicker.css';

import ErrorMessage from '../ErrorMessage';

export interface IDatePickerProps
  extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  required?: boolean;
}

const CDatePicker: FC<IDatePickerProps> = ({
  name = '',
  label = '',
  required,
  ...passProps
}) => {
  const {
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="mb-3">
          {label && (
            <label className="fw-semibold">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}

          <div className={errors[name] ? 'border-danger text-sm' : 'text-sm'}>
            <ReactDatePicker
              selected={field.value}
              showTimeSelect
              showPopperArrow={false}
              popperClassName="z-100"
              className="z-100 relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 is-filled"
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              dateFormat="yyyy/MM/dd HH:mm"
              {...field}
              {...passProps}
              onChange={(date) => {
                setValue(name, date);
                trigger(name);
              }}
            />
          </div>

          {errors[name]?.message && (
            <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default memo(CDatePicker);
