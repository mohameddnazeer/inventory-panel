"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { name: "يناير", value: 400 },
  { name: "فبراير", value: 300 },
  { name: "مارس", value: 200 },
  { name: "أبريل", value: 278 },
];

const pieData = [
  { name: "عهد", value: 100 },
  { name: "مصروف", value: 600 },
  { name: "سلفة", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">تقرير شهري</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">نسبة الاستخدام</h2>
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
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
