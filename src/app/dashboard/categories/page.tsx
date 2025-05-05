
'use client';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useAddCategory } from "@/hooks/Category/useAddCategory";
import { useGetCategory } from "@/hooks/Category/useGetCategory";
import { CategoryFormData, CategorySchema } from "@/schemas/CategoryFormSchema";
import ValidationInput from "@/components/ValidationInput";

export default function CategoryPage() {
  const { data:tableData = [] } = useGetCategory();
  const mutation = useAddCategory()
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize react-hook-form with Zod resolver
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  // Handle form submission
  const handleManualSubmit = (data: CategoryFormData) => {
    console.log("بيانات الفورم اليدوية", data);
    // Send the validated form data to the backend
    // sendDataToBackend(data);
    mutation.mutate(data)
  };

  return (
    <div className="p-0 w-full">
      <h1 className="text-2xl font-bold mb-2 flex items-center justify-between p-1">
        <span className="text-blue-700 flex items-center gap-2">📦 صفحة الاصناف</span>
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowRight className="w-4 h-4" />
          رجوع
        </Link>
      </h1>

      {/* Toggle Form Button */}
      <button
        type="button"
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
      >
        {isFormOpen ? "إخفاء الفورم" : "إظهار الفورم"}
      </button>

      {/* Manual Entry Form */}
      {isFormOpen && (
        // <form
        //   onSubmit={handleSubmit(handleManualSubmit)}
        //   className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200"
        // >
        //   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        //     <Input
        //       label="الاسم"
        //       placeholder="ادخل الاسم"
        //       type="text"
        //       {...register("name")}
        //       error={errors.name?.message}
        //     />
        //     <Input
        //       label="الرقم"
        //       placeholder="ادخل الرقم"
        //       type="number"
        //       {...register("number")}
        //       error={errors.number?.message}
        //     />
        //   </div>
        //   <Input
        //     label="ملاحظات"
        //     placeholder="ادخل جميع الملاحظات"
        //     type="textarea"
        //     {...register("notes")}
        //     error={errors.notes?.message}
        //   />

        //   <div className="flex flex-col md:flex-row items-center justify-center mt-1 gap-4">
        //     <button
        //       type="submit"
        //       className="cursor-pointer w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        //     >
        //       إضافة يدويًا
        //     </button>
        //   </div>
        // </form>
        <form
          onSubmit={handleSubmit(handleManualSubmit)}
          className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ValidationInput
              label="الاسم"
              placeholder="ادخل الاسم"
              type="text"
              name="Name"
              register={register}
              error={errors.Name?.message}
            />
            <ValidationInput
              label="الرقم"
              placeholder="ادخل الرقم"
              type="number"
              name="Number"
              register={register}
              error={errors.Number?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center mt-1 gap-4">
            <button
              type="submit"
              className="cursor-pointer w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              إضافة يدويًا
            </button>
          </div>
        </form>
      )}

      {/* Table Display */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100 text-right text-sm font-bold text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-2">المعرف</th>
              <th scope="col" className="px-4 py-2">الاسم</th>
              <th scope="col" className="px-4 py-2">الرقم</th>
              <th scope="col" className="px-4 py-2">تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody className="text-right text-sm">
            {tableData.map((item: any, idx: number) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.number}</td>
                <td className="px-4 py-2 border">
                  {new Date(item.createdDate).toLocaleDateString("ar-EG")}
                </td>
              </tr>
            ))}
            {tableData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  لا توجد بيانات حاليًا.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
