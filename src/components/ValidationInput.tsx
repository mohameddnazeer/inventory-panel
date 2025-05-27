import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface ValidationInputProps<TFormValues extends FieldValues> {
  label: string;
  placeholder: string;
  type: string;
  error?: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
}

function ValidationInput<TFormValues extends FieldValues>({
  label,
  placeholder,
  type,
  error,
  register,
  name,
}: ValidationInputProps<TFormValues>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : ""
          }`}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default ValidationInput;
