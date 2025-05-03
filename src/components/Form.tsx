
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: 'الاسم مطلوب' })
    .min(6, { message: 'الاسم يجب ألا يقل عن 6 حرف' })
    .max(20, { message: 'الاسم يجب ألا يزيد عن 20 حرفًا' }),

  password: z
    .string()
    .nonempty({ message: 'الباسورد مطلوب' })
    .min(8, { message: 'الباسورد يجب ألا يقل عن 8 احرف' })
    .max(20, { message: 'الباسورد يجب ألا يزيد عن 20 حرفًا' }),

});

// ✅ 2. Infer TypeScript type from schema
type IFormInput = z.infer<typeof schema>;

const Form = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    router.push('/dashboard/home')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto px-3 py-8 rounded-lg">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-600 text-xl">
          ادخل اسم المستخدم
        </label>
        <input
          id="name"
          type="text"
          placeholder="ادخل اسم المستخدم"
          {...register('name')}
          className="bg-zinc-200 border border-gray-300 text-gray-700 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           "
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-600 text-xl">
          ادخل كلمه المرور
        </label>
        <input
          id="password"
          type="password"
          placeholder="ادخل كلمه المرور"
          {...register('password')}
          className="bg-zinc-200 border border-gray-300 text-gray-700 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            "
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      

      <div className="w-full">
        <button
          type="submit"
          className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
            focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
        >
          إرسال
        </button>
      </div>
    </form>
  );
};

export default Form;
