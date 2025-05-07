
import { DeleteLoansModal } from "@/modal/loans/DeleteLoansModal";
import { UpdateLoansModal } from "@/modal/loans/UpdateLoansModal";
import { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";
import { useState } from "react";

type Props = {
  open: boolean;
  data: BorrowedItem[];
  // onUpdate: (item: BorrowedItem) => void;
  // onDelete: (id: number) => void;
};

export default function LoansTable({ open, data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const toWhom = item.toWhom?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || toWhom.includes(term);
  });

  const headers = [
    "الاسم",
    "تاريخ الخروج",
    "المسلم",
    "المسلم له",
    "تم التسليم",
    "ملاحظات",
    "الإجراءات",
  ];

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
        open ? "max-h-[300px]" : "max-h-[700px]"
      }`}
    >
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          ابحث
        </label>
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-2 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="ابحث عن اسم المنتج أو المسلم له"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-right text-gray-700">
        <thead className="text-xs text-gray-800 uppercase bg-gray-100">
          <tr>
            {headers.map((title, index) => (
              <th key={index} className="px-6 py-3 whitespace-nowrap">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4">{item.createdDate}</td>
            <td className="px-6 py-4">{item.createdUser?.name || "N/A"}</td>
            <td className="px-6 py-4">{item.toWhom}</td>
            <td className="px-6 py-4">{item.isReturned ? "تم" : "لم يتم"}</td>
            <td className="px-6 py-4">{item.notes == null ? "لا يوجد ملاحظات" : item.notes}</td>
            <td className="px-6 py-4 space-x-2">
        <button 
          className="text-blue-600 hover:underline"
        >
        <UpdateLoansModal id={item.id}/>
        </button>
        <button
          className="text-red-600 hover:underline"
        >
        <DeleteLoansModal id={item.id}/>
         </button>
      </td>
    </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
