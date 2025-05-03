"use client";

import Input from "@/components/Input";
import InventoryTableHeader from "@/components/InventoryTableHeader";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";
export default function InventoryPage() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const handleManualSubmit = () => {
    console.log("بيانات الفورم اليدوية");
    // sendDataToBackend(data); ← ابعت للباك اند هنا
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
        <form className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input label="السيريال" placeholder="ادخل السيريال" type="text" />
            <Input label="الماركة" placeholder="ادخل الماركة" type="text" />
            <Input label="الاسم" placeholder="ادخل الاسم" type="text" />
            <Input
              label="الكمية الإجمالية"
              placeholder="ادخل الكمية الإجمالية"
              type="number"
            />
            <Input
              label="الكمية المتبقية"
              placeholder="ادخل الكمية المتبقية"
              type="number"
            />
          </div>
          <Input
            label="ملاحظات"
            placeholder="ادخل جميع الملاحظات"
            type="textarea"
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
              type="button"
              onClick={handleManualSubmit}
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
      <InventoryTableHeader open={isFormOpen} />
    </div>
  );
}
