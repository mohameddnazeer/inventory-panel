import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
}

const Input = ({ label, placeholder, type }: InputProps) => {
  return (
    <div>
      <label className="block  text-sm font-medium text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default Input;
