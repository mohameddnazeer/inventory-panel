import React from "react";
import Select from "react-select";
import { Control, Controller } from "react-hook-form";

interface Option {
  value:  string;
  label: string;
}

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options?: Option[];
  placeholder: string;
  error?: string;
}

export const ReusableSelect: React.FC<Props> = ({
  name,
  control,
  options,
  placeholder,
  error,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            isClearable
            onChange={(selectedOption) => {
              field.onChange(selectedOption?.value ?? null);
            }}
            value={options?.find(option => option.value === field.value)  || null}
          />
        )}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};
