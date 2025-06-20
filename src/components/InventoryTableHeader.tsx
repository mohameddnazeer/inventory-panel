import { DeleteInventoryModal } from "@/modal/inventory/DeleteInventoryModal";
import { UpdateInventoryModal } from "@/modal/inventory/UpdateInventoryModal";
import { ExistedItem } from "@/services/existedItems/existedGetService";
import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { DecodedJWT } from "@/app/dashboard/categories/page";



export default function InventoryTableHeader({
  open,
  data: existedItems,
  searchTerm,
  setSearchTerm,
  setPage,
}: {
  open: boolean;
  data: ExistedItem[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [role, setRole] = useState<string | null>(null);

useEffect(() => {
  const token = localStorage.getItem('accessToken');


  if (token) {
    const decoded: DecodedJWT = jwtDecode(token);
  

    const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    setRole(roleClaim);
  }
}, []);
  


  return (
  <div
  className={`relative overflow-x-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-4 transition-all duration-300 ${
        !open ? "h-[75vh]" : "h-[35vh]"
      }`}
>
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <h2 className="text-lg w-[7%] font-semibold text-gray-700">جدول المخزن</h2>
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={searchTerm}
         onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1); 
        }}
        placeholder="ابحث عن اسم المنتج"
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
      />
      <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
                4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>

  {/* Scrollable Table Container */}
  <div className="overflow-auto max-h-[calc(100vh-250px)]">
    <table className="min-w-[1000px] w-full text-sm text-right text-gray-600 border-collapse">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-3 text-xs font-semibold">اسم المنتج</th>
          <th className="px-4 py-3 text-xs font-semibold">الماركة (البرند)</th>
          <th className="px-4 py-3 text-xs font-semibold">السيريال</th>
          <th className="px-4 py-3 text-xs font-semibold">الكمية</th>
          <th className="px-4 py-3 text-xs font-semibold">وحدة الكمية</th>
          <th className="px-4 py-3 text-xs font-semibold">ملاحظات</th>
          <th className="px-4 py-3 text-xs font-semibold text-center">إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {existedItems.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-6 text-gray-400">
              لا توجد بيانات مطابقة
            </td>
          </tr>
        ) : (
          existedItems.map(item => (
            <tr
              key={item.id}
              className="bg-white hover:bg-blue-50 border-b transition duration-150"
            >
              <td className="px-4 py-3">{item.name ?? "—"}</td>
              <td className="px-4 py-3">{item.brand ?? "—"}</td>
              <td className="px-4 py-3">{item.serial ?? "—"}</td>
              <td className="px-4 py-3">{item.quantity ?? "—"}</td>
              <td className="px-4 py-3">{item.quantityEnum ?? "—"}</td>
              <td className="px-4 py-3">{item.notes ?? "—"}</td>
              <td className="px-4 py-3 text-center">
                {role === "Admin" ? (
                  <div className="flex justify-center gap-2">
                    <button className="text-white text-xs font-medium px-3 py-1 transition">
                      <UpdateInventoryModal id={item.id} sqId={item.sqId} />
                    </button>
                    <button
                      className="text-white text-xs font-medium px-3 py-1 transition"
                      
                    >
                      <DeleteInventoryModal id={item.id} />
                    </button>
                  </div>
                ) : (
                  <p>لا يمكنك اتخاذ اي اجراء</p>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

  );
}
