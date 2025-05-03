"use client";

import ExpensesTable from "@/components/ExpensesTable";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";
export default function page() {
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
      "اسم الصنف",
      "الكميه",
      "تاريخ الصرف",
      "اسم المصروف له",
      "المسلم",
      "المسلم له",
      "السيريال",
      "ملاحظات",
    ];

    const worksheet = XLSX.utils.json_to_sheet([], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "نموذج البيانات");
    XLSX.writeFile(workbook, "نموذج_المصروفات.xlsx");
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
    <div className="p-0 w-full bg-transparent">
      <h1 className="text-2xl font-bold mb-2 flex items-center justify-between  p-1 ">
        <span className="text-blue-700 flex items-center gap-2">
          📦 صفحة المصروفات
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
            <Input label="اسم الصنف" placeholder="ادخل اسم الصنف" type="text" />
            <Input label="الكميه" placeholder="ادخل الكميه" type="number" />
            <Input
              label="تاريخ الصرف"
              placeholder="ادخل تاريخ الصرف"
              type="date"
            />
            <Input
              label="اسم المصروف له"
              placeholder="ادخل اسم المصروف له  "
              type="text"
            />
            <Input label="المسلم" placeholder="ادخل اسم المسلم " type="text" />
            <Input
              label="المسلم له"
              placeholder="ادخل اسم المسلم له "
              type="text"
            />
            <Input label="السيريال" placeholder="ادخل السيريال " type="text" />
          </div>
          <Input
            label="ملاحظات"
            placeholder="ادخل جميع الملاحظات"
            type="textarea"
          />

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
      {/* جدول عرض  */}
      <ExpensesTable open={isFormOpen} />
    </div>
  );
}
