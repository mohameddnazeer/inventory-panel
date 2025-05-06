// import { ExistedItem } from "@/services/existedItems/existedGetService";
// import { useState } from "react";

// export default function InventoryTableHeader({open,data:products}:{open:boolean;data:ExistedItem[]}) {
//   const [searchTerm, setSearchTerm] = useState("");


//   return (
//     <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${open? 'max-h-[300px]' :  'max-h-[700px]'} `}>
//       <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
       

//         {/* Search input */}
//         <label htmlFor="table-search" className="sr-only">
//           Search
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-2 flex items-center ps-3 pointer-events-none">
//             <svg
//               className="w-5 h-5 text-gray-500 "
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="ابحث عن اسم المنتج"
//             className=" border-gray-300 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
//           />
//         </div>
//       </div>
//       {/* new Table */}
//       <table className="w-full text-sm text-right text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//           <tr>
//             <th className="px-6 py-3">اسم المنتج</th>
//             <th className="px-6 py-3">النوع (البرند)</th>
//             <th className="px-6 py-3">السيريال</th>
//             {/* <th className="px-6 py-3">الكمية الاجمالية</th>
//             <th className="px-6 py-3">الكمية المتبقية</th> */}
//             <th className="px-6 py-3">ملاحظات</th>
//             <th className="px-6 py-3">الإجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
//               <td className="px-6 py-4">{product.name}</td>
//               <td className="px-6 py-4">{product.brand}</td>
//               <td className="px-6 py-4">{product.serial}</td>
//               <td className="px-6 py-4">{product.notes}</td>
//               <td className="px-6 py-4 flex gap-2">
//                 <button
//                   onClick={() => console.log(product.id)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   تحديث
//                 </button>
//                 <button
//                   onClick={() => console.log(product.id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   حذف
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
// </table>
//     </div>
//   );
// }

import { ExistedItem } from "@/services/existedItems/existedGetService";
import { useState } from "react";

export default function InventoryTableHeader({
  open,
  data: products,
}: {
  open: boolean;
  data: ExistedItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`relative overflow-x-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-4 transition-all duration-300 ${
        open ? "max-h-[300px]" : "max-h-[700px]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700">جدول المخزن</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن اسم المنتج"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
          />
          <div className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
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

      {/* Table */}
      <table className="w-full text-sm text-right text-gray-600 border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold">اسم المنتج</th>
            <th className="px-4 py-3 text-xs font-semibold">النوع (البرند)</th>
            <th className="px-4 py-3 text-xs font-semibold">السيريال</th>
            <th className="px-4 py-3 text-xs font-semibold">ملاحظات</th>
            <th className="px-4 py-3 text-xs font-semibold text-center">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                لا توجد بيانات مطابقة
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="bg-white hover:bg-blue-50 border-b transition duration-150"
              >
                <td className="px-4 py-3">{product.name ?? "—"}</td>
                <td className="px-4 py-3">{product.brand ?? "—"}</td>
                <td className="px-4 py-3">{product.serial ?? "—"}</td>
                <td className="px-4 py-3">{product.notes ?? "—"}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm transition"
                      onClick={() => console.log("Update", product.id)}
                    >
                      تحديث
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm transition"
                      onClick={() => console.log("Delete", product.id)}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
