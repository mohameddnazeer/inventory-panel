
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {useLoginUser} from '@/hooks/useLoginUser';
import { LoginFormData, schema } from '@/schemas/loginFormSchema';

const Form = () => {

  const mutation = useLoginUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => mutation.mutate(data);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-sm mx-auto rounded-4xl px-3 py-8 ">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-600 text-md">
          ادخل اسم المستخدم
        </label>
        <input
          id="name"
          type="text"
          placeholder="ادخل اسم المستخدم"
          {...register('UserName')}
          className="bg-zinc-200 border border-gray-300 text-gray-700 text-sm rounded-lg
            focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5
           "
        />
        {errors.UserName && <p className="mt-1 text-sm text-red-500">{errors.UserName.message}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-600 text-md">
          ادخل كلمه المرور
        </label>
        <input
          id="password"
          type="password"
          placeholder="ادخل كلمه المرور"
          {...register('password')}
          className="bg-zinc-200 border border-gray-300 text-gray-700 text-sm rounded-lg
            focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5
            "
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="w-full flex justify-center mt-10 items-center ">
        <button
          type="submit"
          className="text-white w-[60%] bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none
            focus:ring-slate-300 font-medium rounded-lg text-sm px-2 py-1 text-center cursor-pointer"
        >
          إرسال
        </button>
      </div>
    </form>
  );
};

export default Form;
