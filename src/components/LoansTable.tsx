import { DecodedJWT } from "@/app/dashboard/categories/page";
import { DeleteLoansModal } from "@/modal/loans/DeleteLoansModal";
import { UpdateLoansModal } from "@/modal/loans/UpdateLoansModal";
import { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  data: BorrowedItem[];
  // onUpdate: (item: BorrowedItem) => void;
  // onDelete: (id: number) => void;
};

export default function LoansTable({ open, data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const filteredData = data.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const toWhom = item.toWhom?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || toWhom.includes(term);
  });

  const headers = [
    "الاسم",
    "تاريخ الخروج",
    // "المسلم",
    "المسلم له",
    "تم التسليم",
    "ملاحظات",
    "الإجراءات",
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded: DecodedJWT = jwtDecode(token);
      const roleClaim =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setRole(roleClaim);
    }
  }, []);
  return (
    <div
      className={`relative overflow-x-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-4 transition-all duration-300 ${
        !open ? "h-[75vh]" : "h-[45vh]"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-lg w-[7%] font-semibold text-gray-700">جدول السلف</h2>
        <div className="relative w-full sm:w-64">
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
            placeholder="ابحث عن اسم السلفة   "
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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                لا توجد بيانات مطابقة
              </td>
            </tr>
          ) : (
          filteredData.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4">{item.createdDate.slice(0, 10)}</td>
              {/* <td className="px-6 py-4">{item.createdUser?.name || "لم يتم التحديد"}</td> */}
              <td className="px-6 py-4">{item.toWhom}</td>
              <td className="px-6 py-4">{item.isReturned ? "تم" : "لم يتم"}</td>
              <td className="px-6 py-4">
                {item.notes == null ? "لا يوجد ملاحظات" : item.notes}
              </td>
              <td className="px-6 py-4 space-x-2">
                {role === "Admin" ? (
                  <>
                    <button className="text-blue-600 hover:underline cursor-pointer">
                      <UpdateLoansModal id={item.id} />
                    </button>
                    <button className="text-red-600 hover:underline">
                      <DeleteLoansModal id={item.id} />
                    </button>
                  </>
                ) : (
                  <p>لا يمكنك اتخاذ اي اجراء</p>
                )}
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}
