"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

interface ChartsSectionProps {
  counts?: {
    existingCount: number;
    dispensedCount: number;
    borrowedCount: number;
  };
}

export default function ChartsSection({ counts }: ChartsSectionProps) {
  const existingCount = counts?.existingCount ? Number(counts.existingCount) : 0;
  const dispensedCount = counts?.dispensedCount ? Number(counts.dispensedCount) : 0;
  const borrowedCount = counts?.borrowedCount ? Number(counts.borrowedCount) : 0;

  const pieData = [
    { name: "عهد", value: existingCount },
    { name: "مصروف", value: dispensedCount },
    { name: "سلفة", value: borrowedCount },
  ];

  const barData = [
    {
      name: "إحصائيات المخزن",
      عهد: existingCount,
      مصروف: dispensedCount,
      سلفة: borrowedCount,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">إحصائيات المخزن</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={value => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="عهد" fill="#0088FE" />
            <Bar dataKey="مصروف" fill="#00C49F" />
            <Bar dataKey="سلفة" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">نسبة اداره المخزن</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={value => value.toLocaleString()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
}