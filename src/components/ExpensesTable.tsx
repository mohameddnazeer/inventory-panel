// import { RequestData } from "@/services/borrowedItems/borrowedItemsService";
// import { useState } from "react";


// export default function ExpensesTable({open,data}:{open:boolean, data:RequestData[]}) {
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

//       {/* Table */}
//       <table className="w-full text-sm text-right text-gray-500 ">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
//           <tr>
//             <th className="px-6 py-3">اسم الصنف</th>
//             <th className="px-6 py-3">الكميه</th>
//             <th className="px-6 py-3">تاريخ الصرف</th>
//             <th className="px-6 py-3">اسم المصروف له</th>
//             <th className="px-6 py-3">المسلم</th>
//             <th className="px-6 py-3">المسلم له</th>
//             <th className="px-6 py-3">السيريال</th>
//             <th className="px-6 py-3">ملاحظات </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-white border-b  hover:bg-gray-50 ">
//             <td className="px-6 py-4 font-medium text-gray-900 ">
//               {data?.Name}
//             </td>
//             <td className="px-6 py-4">{data?.Quantity}</td>
//             <td className="px-6 py-4">{data.Name}</td>
//             <td className="px-6 py-4">1999</td>
//             <td className="px-6 py-4">152</td>
//             <td className="px-6 py-4"></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import { RequestData } from "@/services/borrowedItems/borrowedItemsService";
import { DispensedItem } from "@/services/dispensedItems/dispensedGetService";
import { useState } from "react";

export default function ExpensesTable({
  open,
  data,
}: {
  open: boolean;
  data: DispensedItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.receiverName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
        open ? "max-h-[300px]" : "max-h-[700px]"
      }`}
    >
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        {/* Search input */}
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن اسم المنتج"
            className="border-gray-300 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">اسم الصنف</th>
            <th className="px-6 py-3">تاريخ الصرف</th>
            <th className="px-6 py-3">اسم المصروف له</th>
            <th className="px-6 py-3">المسلم</th>
            <th className="px-6 py-3">المسلم له</th>
            <th className="px-6 py-3">السيريال</th>
            <th className="px-6 py-3">ملاحظات</th>
            <th className="px-6 py-3">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.existingItemId} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{item.toWhom ?? "—"}</td>
              <td className="px-6 py-4">
                {item.deliveredName ? new Date(item.deliveredName).toLocaleDateString() : "—"}
              </td>
              <td className="px-6 py-4">{item.receiverName ?? "—"}</td>
              <td className="px-6 py-4">{item.toWhom ?? "—"}</td>
              <td className="px-6 py-4">{item.deliveredName ?? "—"}</td>
              <td className="px-6 py-4">{item.existingItemId}</td>
              <td className="px-6 py-4">{item.notes ?? "—"}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded px-3 py-1 text-xs"
                  onClick={() => console.log("Update", item.existingItemId)}
                >
                  تحديث
                </button>
                <button
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded px-3 py-1 text-xs"
                  onClick={() => console.log("Delete", item.existingItemId)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
