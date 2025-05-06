"use client";
import dynamic from "next/dynamic";
import Card from "@/components/Card";
import { useGetBorrowedItems } from "@/hooks/BorrowedItems/useGetBorrowedItems";

const ChartsSection = dynamic(() => import("../../components/ChartsSection"), {
  ssr: false,
});

export default function Home() {
 
  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 p-6 pt-0">
        <h1 className="text-4xl font-bold mb-4">store</h1>
        <p className="text-lg text-gray-700">
          هذه هي الصفحة الرئيسية للوحة الإدارة.
        </p>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <Card title="اجمالي العهد" totalNumber={571} to="./dashboard/inventory" />
        <Card title="اجمالي المصروفات" totalNumber={4587} to="./dashboard/expenses" />
        <Card title="اجمالي السلف" totalNumber={571} to="./dashboard/loans" />
      </div>

      <ChartsSection />
    </>
  );
}
