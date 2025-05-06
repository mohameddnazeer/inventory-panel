"use client";

import InventoryTableHeader from "@/components/InventoryTableHeader";
import ValidationInput from "@/components/ValidationInput";
import { useAddExistedItem } from "@/hooks/ExistedItems/useAddExistedItem";
import { useGetExistedItmes } from "@/hooks/ExistedItems/useGetExistedItems";
import { ExistedFormData, ExistedSchema } from "@/schemas/ExistedFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";
export default function InventoryPage() {


  const {data} = useGetExistedItmes()
  const mutation = useAddExistedItem()
  console.log(data)
  const [excelData, setExcelData] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
 
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ExistedFormData>({
      resolver: zodResolver(ExistedSchema),
    });
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      setExcelData(jsonData as any[]);
    };

    reader.readAsBinaryString(file);
  };

  const generateExcelTemplate = () => {
    const headers = [
      "السيريال",
      "الماركة",
      "الاسم",
      "الكمية الإجمالية",
      "الكمية المتبقية",
      "ملاحظات",
    ];

    const worksheet = XLSX.utils.json_to_sheet([], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "نموذج البيانات");
    XLSX.writeFile(workbook, "نموذج_العهدة.xlsx");
  };

  const onSubmit = (data:ExistedFormData) => {
    console.log("بيانات الفورم اليدوية");
    mutation.mutate(data)
  };

  const handleExcelSubmit = () => {
    if (excelData.length === 0) return;

    console.log("بيانات الملف:", excelData);
    // sendDataToBackend(excelData);
  };
  return (
    <div className="p-0 w-full">
      <h1 className="text-2xl font-bold mb-2 flex items-center justify-between  p-1 ">
        <span className="text-blue-700 flex items-center gap-2">
          📦 صفحة العهدة
        </span>

        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowRight className="w-4 h-4" />
          رجوع
        </Link>
      </h1>
      {/* زر فتح/إغلاق الفورم */}
      <button
        type="button"
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition cursor-pointer"
      >
        {isFormOpen ? "إخفاء الفورم" : "إظهار الفورم"}
      </button>

      {/* Form لإضافة عنصر جديد */}
      {isFormOpen && (
       
<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

    <ValidationInput 
      label="الاسم"
      name="Name"
      register={register}
      placeholder="ادخل الاسم"
      type="text"
      error={errors.Name?.message}
    />

    <ValidationInput 
      label="الماركة"
      name="Brand"
      register={register}
      placeholder="ادخل الماركة"
      type="text"
      error={errors.Brand?.message}
    />

    <ValidationInput 
      label="السيريال"
      name="Serial"
      register={register}
      placeholder="ادخل السيريال"
      type="text"
      error={errors.Serial?.message}
    />

    <ValidationInput 
      label="الكمية"
      name="Quantity"
      register={register}
      placeholder="ادخل الكمية"
      type="text"
      error={errors.Quantity?.message}
    />

    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">
        وحدة الكمية
      </label>
      <select
        {...register("QuantityEnum")}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">اختر وحدة</option>
        <option value="UNIT">قطعة</option>
        <option value="KG">كيلو</option>
        <option value="LITER">لتر</option>
      </select>
      {errors.QuantityEnum && (
        <p className="text-red-500 text-sm mt-1">{errors.QuantityEnum.message}</p>
      )}
    </div>

    <ValidationInput
      label="رقم التخزين"
      name="SqId"
      register={register}
      placeholder="ادخل رقم التخزين"
      type="text"
      error={errors.SqId?.message}
    />

    {/* Image Upload */}
    <div className="flex flex-col col-span-2">
      <label className="mb-1 text-sm font-medium text-gray-700">الصورة</label>
      <input
        type="file"
        accept="image/*"
        {...register("ImageFile")}
        className="p-2 border border-gray-300 rounded"
      />
      {errors.ImageFile && (
        <p className="text-red-500 text-sm mt-1">{errors.ImageFile.message}</p>
      )}
    </div>
  </div>

  <ValidationInput
    label="ملاحظات"
    name="Notes"
    register={register}
    placeholder="ادخل الملاحظات (اختياري)"
    type="textarea"
    error={errors.Notes?.message}
  />

  <div className="flex justify-center mt-4">
    <button
      type="submit"
      className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      إرسال
    </button>
  </div>
</form>


      )}

      {/* جدول عرض العهدة */}
      <InventoryTableHeader data={data ?? []} open={isFormOpen} />
    </div>
  );
}
