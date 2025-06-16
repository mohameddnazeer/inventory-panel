"use client";

import InventoryTableHeader from "@/components/InventoryTableHeader";
import { PaginationControls } from "@/components/PaginationControls";
import { ReusableSelect } from "@/components/ReusableSelect";
import ValidationInput from "@/components/ValidationInput";
import { useGetCategory } from "@/hooks/Category/useGetCategory";
import { useAddExistedItem } from "@/hooks/ExistedItems/useAddExistedItem";
import { useGetExistedItems } from "@/hooks/ExistedItems/useGetExistedItems";
import { useUploadExcel } from "@/hooks/ExistedItems/useUploadExcel";
import { ExistedFormData, ExistedSchema } from "@/schemas/ExistedFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";

// ✅ Add the type for Excel rows
type ExcelRow = {
  السيريال: string;
  الماركة: string;
  الاسم: string;
  "الكمية الإجمالية": string | number;
  "الكمية المتبقية": string | number;
  ملاحظات: string;
};

export default function InventoryPage() {
  // ✅ Explicitly type the excel data
  const [excelData, setExcelData] = useState<ExcelRow[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: existedData } = useGetExistedItems(page, pageSize, searchTerm);
  const paginationInfo = existedData?.pagination || {
    CurrentPage: page,
    TotalPages: 1,
    PageSize: pageSize,
    TotalRecords: 0,
    HasPrivous: false,
    HasNext: false,
  };
  const { data: categoryItems } = useGetCategory();
  const { mutate: addExistedItem } = useAddExistedItem();
  const { mutate: upload } = useUploadExcel();
  useEffect(() => {
    console.log("Page changed:", page);
  }, [page]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<ExistedFormData>({
    resolver: zodResolver(ExistedSchema),
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
        defval: "",
      });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const generateExcelTemplate = () => {
    const headers = [
      "Name",
      "ImagePath",
      "Brand",
      "Serial",
      "Note",
      "Quantity",
      "QuantityEnum",
      "SqId",
    ];
    const worksheet = XLSX.utils.json_to_sheet([], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "نموذج البيانات");
    XLSX.writeFile(workbook, "نموذج_العهدة.xlsx");
  };

  const onSubmit = (data: ExistedFormData) => {
    const formData = new FormData();

    formData.append("Name", data.Name);
    if (data.ImageFile) {
      formData.append("ImageFile", data.ImageFile);
    }
    formData.append("Brand", data.Brand);
    formData.append("Serial", data.Serial);
    formData.append("Quantity", data.Quantity);
    formData.append("QuantityEnum", data.QuantityEnum);
    formData.append("SqId", data.SqId);
    if (data.Notes) {
      formData.append("Notes", data.Notes);
    }

    addExistedItem(formData, {
      onSuccess: () => {
        reset({
          Name: "",
          Brand: "",
          Serial: "",
          Quantity: "",
          QuantityEnum: "UNIT", // or "METER", depending on default
          SqId: "",
          ImageFile: undefined,
          Notes: "",
        });
      },
    });
  };

  const handleExcelSubmit = () => {
    // Convert your data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Create an ArrayBuffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the ArrayBuffer
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", excelBlob, "data.xlsx");

    // Upload it
    upload(formData);
  };

  const options = categoryItems?.data?.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));
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

      <button
        type="button"
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition cursor-pointer"
      >
        {isFormOpen ? "إخفاء الفورم" : "إظهار الفورم"}
      </button>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <ValidationInput<ExistedFormData>
              label="الاسم"
              name="Name"
              register={register}
              placeholder="ادخل الاسم"
              type="text"
              error={errors.Name?.message}
            />

            <ValidationInput<ExistedFormData>
              label="الماركة"
              name="Brand"
              register={register}
              placeholder="ادخل الماركة"
              type="text"
              error={errors.Brand?.message}
            />

            <ValidationInput<ExistedFormData>
              label="السيريال"
              name="Serial"
              register={register}
              placeholder="ادخل السيريال"
              type="text"
              error={errors.Serial?.message}
            />

            <ValidationInput<ExistedFormData>
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
                <option disabled value="">
                  اختر وحدة
                </option>
                <option value="UNIT">قطعة</option>
                <option value="METER">كيلو</option>
              </select>
              {errors.QuantityEnum && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.QuantityEnum.message}
                </p>
              )}
            </div>

            {/* <ValidationSelect<ExistedFormData>
              label="اختر الصنف"
              name="SqId"
              register={register}
              options={categoryItems || []}
              error={errors.SqId?.message}
            /> */}

            <div>
              <h2 className="block text-sm font-medium text-gray-700 mb-2">
                اختر الصنف
              </h2>
              <ReusableSelect
                control={control}
                name="SqId"
                error={errors.SqId?.message}
                options={options}
                placeholder="اختر الصنف"
              />
            </div>

            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-sm font-medium text-gray-700">
                الصورة
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setValue("ImageFile", file as File, {
                    shouldValidate: true,
                  });
                }}
                className="p-2 border border-gray-300 rounded"
              />
              {errors.ImageFile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ImageFile.message}
                </p>
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

          <div className="mt-4">
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
          {excelData.length > 0 && (
            <div className="overflow-x-auto mt-1 ">
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
          <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
            <button
              type="submit"
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
      {/* جدول عرض العهدة */}
      <InventoryTableHeader
        data={existedData?.data ?? []}
        open={isFormOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
      />
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
