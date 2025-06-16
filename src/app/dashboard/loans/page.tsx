"use client";

import LoansTable from "@/components/LoansTable";
import { PaginationControls } from "@/components/PaginationControls";
import { ReusableSelect } from "@/components/ReusableSelect";
import ValidationInput from "@/components/ValidationInput";
import { useAddBorrowedItems } from "@/hooks/BorrowedItems/useAddBorrowedItems";
import { useGetBorrowedItems } from "@/hooks/BorrowedItems/useGetBorrowedItems";
import { useGetExistedItems } from "@/hooks/ExistedItems/useGetExistedItems";
import { BorrowedFormData, BorrowedSchema } from "@/schemas/BorrowedFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";

interface MyFormFields {
  name: string;
  toWhom: string;
  isReturned: string;
  notes?: string;
}
export default function Page() {
  const [excelData, setExcelData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const { data } = useGetBorrowedItems(page, pageSize);
  const { data: existedData } = useGetExistedItems(page, pageSize);
  const paginationInfo = data?.pagination || {
    CurrentPage: page,
    TotalPages: 1,
    PageSize: pageSize,
    TotalRecords: 0,
    HasPrivous: false,
    HasNext: false,
  }

  const Mutation = useAddBorrowedItems();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BorrowedSchema),
  });

  const onSubmit = (passingdata: BorrowedFormData) => {

    Mutation.mutate(passingdata); // assuming your mutate function accepts the form data

    reset();
  };

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

      setExcelData(jsonData as []);
    };

    reader.readAsBinaryString(file);
  };
  const generateExcelTemplate = () => {
    const headers = [
      "الاسم",
      "تاريخ الخروج",
      "المسلم",
      "المسلم له",
      "السبب",
      "ملاحظات",
      "الحالة",
    ];
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "نموذج البيانات");
    XLSX.writeFile(workbook, "نموذج_السلفه.xlsx");
  };
  const handleExcelSubmit = () => {
    if (excelData.length === 0) return;

    // sendDataToBackend(excelData);
  };

  const options = existedData?.data?.map((item) => {
    return {
      value: String(item.name),
      label: item.name,
    };
  });
  return (
    <div className="p-0 w-full">
      <h1 className="text-2xl font-bold mb-2 flex items-center justify-between  p-1 ">
        <span className="text-blue-700 flex items-center gap-2">
          📦 صفحة السلف
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* <ValidationInput
              label="اسم العهدة"
              name="name"
              register={register}
              placeholder="ادخل الاسم "
              type="text"
              error={errors.name?.message}
            /> */}
            {/* <ValidationSelect<MyFormFields>
              label="اختر العهدة"
              name="name"
              register={register}
              options={existedData || []}
              error={errors.name?.message}
              type="name"
            /> */}
            <div className="">
              <h2 className="block text-sm font-medium text-gray-700 mb-2">
                اختر العهدة
              </h2>
              <ReusableSelect
                control={control}
                name="name"
                error={errors.name?.message}
                options={options}
                placeholder="اختر العهدة"
              />
            </div>
            <ValidationInput<MyFormFields>
              name="toWhom"
              register={register}
              label="المسلم له"
              placeholder="ادخل اسم المسلم له "
              type="text"
              error={errors.toWhom?.message}
            />
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                هل تم التسليم؟
              </label>
              <select
                {...register("isReturned")}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">الحاله</option>
                <option value="true">تم العودة</option>
                <option value="false">لم يتم العودة</option>
              </select>
            </div>
          </div>

          <ValidationInput<MyFormFields>
            label="ملاحظات"
            name="notes"
            register={register}
            placeholder="ادخل جميع الملاحظات"
            type="textarea"
            error={errors.notes?.message}
          />

          {/* Excel Upload */}
          <div className="mt-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              أو تحميل ملف Excel
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center mt-1 gap-4">
            <button
              type="submit"
              // onClick={handleManualSubmit}
              className="cursor-pointer w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              إضافة يدويًا
            </button>

            <button
              type="button"
              onClick={handleExcelSubmit}
              disabled={excelData.length === 0}
              className={`w-full md:w-auto px-6 py-2 rounded transition ${
                excelData.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "cursor-pointer bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              إرسال ملف Excel
            </button>

            <button
              type="button"
              onClick={generateExcelTemplate}
              className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              تحميل نموذج Excel
            </button>
          </div>
        </form>
      )}

      {/* عرض بيانات Excel إن وجدت */}
      {excelData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">
            📋 بيانات الملف:
          </h2>
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                {Object.keys(excelData[0]).map((header, i) => (
                  <th key={i} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, i) => (
                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                  {Object.values(row).map((cell, j) => (
                    <td key={j} className="px-4 py-2 border">
                      {cell as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* جدول عرض السلف السابقة */}
      <LoansTable data={data?.data ?? []} open={isFormOpen} />
      <PaginationControls 
       CurrentPage={paginationInfo.CurrentPage}
        TotalPages={paginationInfo.TotalPages}
        HasPrivous={paginationInfo.HasPrivous}
        HasNext={paginationInfo.HasNext}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
