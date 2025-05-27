import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface ValidationSelectProps<TFormValues extends FieldValues> {
  label: string;
  error?: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  options: { id: number | string; name: string }[];
  type ?: string
}

function ValidationSelect<TFormValues extends FieldValues>({
  label,
  error,
  register,
  name,
  options,
  type
}: ValidationSelectProps<TFormValues>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register(name)}
        className={`w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option disabled value="">
          {options.length > 0 && (options[0].hasOwnProperty("sqId") ? "عهدة" : "صنف")}
        </option>
        {options.map((option) => (
          <option key={option.id} value={type === 'name' ? option.name : option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default ValidationSelect;
