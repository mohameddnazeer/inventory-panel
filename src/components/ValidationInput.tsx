interface ValidationInputProps {
    label: string;
    placeholder: string;
    type: string;
    error?: string;
    register: any; // Add register prop
    name: string; // Add name prop
  }
  
  const ValidationInput = ({ label, placeholder, type, error, register, name }: ValidationInputProps) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {type === "textarea" ? (
          <textarea
            {...register(name)} // Register the input
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
        ) : (
          <input
            {...register(name)} // Register the input
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
          />
        )}
        {error && <span className="text-red-500 text-sm">{error}</span>} {/* Display error message */}
      </div>
    );
  };
  

  export default ValidationInput