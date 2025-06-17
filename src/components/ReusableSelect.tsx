import React from "react";
import { Controller } from "react-hook-form";
import { AsyncPaginate } from "react-select-async-paginate";

interface ReusableSelectProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadOptions: any;
  placeholder?: string;
}

export const ReusableSelect: React.FC<ReusableSelectProps> = ({
  name,
  control,
  error,
  loadOptions,
  placeholder = "اختر",
}) => {

  
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <AsyncPaginate
              {...field}
              value={field.value}
               onChange={(selected) => field.onChange(selected?.value || "")}
              loadOptions={loadOptions}
              additional={{ page: 1 }}
              placeholder={placeholder}
              isClearable
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </>
        )}
      />
    </div>
  );
};
