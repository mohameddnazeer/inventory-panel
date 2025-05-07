interface ValidationSelectProps {
    label: string;
    error?: string;
    register: any;
    name: string;
    options: { id: number | string; name: string }[];
  }
  
  const ValidationSelect = ({ label, error, register, name, options }: ValidationSelectProps) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
          {...register(name)}
          className={`w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
        >

          {/* this option value 21 for starting posting first item then you can remove it or make disable */}
          <option  value={21}> pc</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  };
  
  export default ValidationSelect;
  