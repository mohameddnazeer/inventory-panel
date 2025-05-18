"use client";

import Card from "@/components/Card";
import ChartsSection from "@/components/ChartsSection";
import { useGetItemsCounts } from "@/hooks/useGetItemsCounts";

export default function Home() {
  const { data: counts, isLoading } = useGetItemsCounts();

  const existingCount = counts?.existingCount ? Number(counts.existingCount) : 0;
  const dispensedCount = counts?.dispensedCount ? Number(counts.dispensedCount) : 0;
  const borrowedCount = counts?.borrowedCount ? Number(counts.borrowedCount) : 0;

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 p-6 pt-0">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">منظومة ادارة مخزن النظم</h1>
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          الخاص بجهاز مستقبل مصر للتنمية المستدامة
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <Card
          title="اجمالي العهد"
          totalNumber={existingCount}
          to="./dashboard/inventory"
          isLoading={isLoading}
        />
        <Card
          title="اجمالي المصروفات"
          totalNumber={dispensedCount}
          to="./dashboard/expenses"
          isLoading={isLoading}
        />
        <Card
          title="اجمالي السلف"
          totalNumber={borrowedCount}
          to="./dashboard/loans"
          isLoading={isLoading}
        />
      </div>

      <ChartsSection counts={counts} />
    </>
  );
}
