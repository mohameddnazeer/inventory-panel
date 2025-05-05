// import { BorrowedItem } from "@/services/borrowedItems/borrowedItemsService";
// import { useState } from "react";

// export default function LoansTable({open}:{open:boolean;data:BorrowedItem[]}) {
//   // const [selectedFilter, setSelectedFilter] = useState("اخر يوم");
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // const filters = [
//   //   "اخر يوم",
//   //   "اخر 7 ايام",
//   //   "اخر 30 يوم",
//   //   "اخر 3 شهور",
//   //   "اخر 6 شهور",
//   // ];

//   return (
//     <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${open? 'max-h-[300px]' :  'max-h-[700px]'} `}>
//       <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
       
//         {/* <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen((prev) => !prev)}
//             className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
//             type="button"
//           >
//             <svg
//               className="w-3 h-3 text-gray-500  me-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
//             </svg>
//             {selectedFilter}
//             <svg
//               className="w-2.5 h-2.5 ms-2.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm ">
//               <ul className="p-3 space-y-1 text-sm text-gray-700 ">
//                 {filters.map((filter) => (
//                   <li key={filter}>
//                     <div
//                       className="flex items-center p-2 rounded-sm hover:bg-gray-100  cursor-pointer"
//                       onClick={() => {
//                         setSelectedFilter(filter);
//                         setIsDropdownOpen(false);
//                       }}
//                     >
//                       <input
//                         id={`filter-radio-${filter}`}
//                         type="radio"
//                         checked={selectedFilter === filter}
//                         onChange={() => setSelectedFilter(filter)}
//                         name="filter-radio"
//                         className="w-4 h-4"
//                       />
//                       <label
//                         htmlFor={`filter-radio-${filter}`}
//                         className="w-full ms-2 text-sm font-medium"
//                       >
//                         {filter}
//                       </label>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div> */}

       
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
//             <th className="px-6 py-3">الاسم</th>
//             <th className="px-6 py-3">تاريخ الخروج</th>
//             <th className="px-6 py-3">المسلم</th>
//             <th className="px-6 py-3">المسلم له</th>
//             <th className="px-6 py-3">السبب</th>
//             <th className="px-6 py-3">تم التسليم</th>
//             <th className="px-6 py-3">ملاحظات</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-white border-b  hover:bg-gray-50 ">
//             <td className="px-6 py-4 font-medium text-gray-900 ">
//               Microsoft Surface Pro
//             </td>
//             <td className="px-6 py-4">White</td>
//             <td className="px-6 py-4">Laptop PC</td>
//             <td className="px-6 py-4">1999</td>
//             <td className="px-6 py-4">152</td>
//             <td className="px-6 py-4"></td>
//           </tr>
          
          
//           <tr className="bg-white border-b  hover:bg-gray-50 ">
//             <td className="px-6 py-4 font-medium text-gray-900 ">
//               Microsoft Surface Pro
//             </td>
//             <td className="px-6 py-4">White</td>
//             <td className="px-6 py-4">Laptop PC</td>
//             <td className="px-6 py-4">1999</td>
//             <td className="px-6 py-4">152</td>
//             <td className="px-6 py-4"></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { BorrowedItem } from "@/services/borrowedItems/borrowedItemsService";
import { useState } from "react";

export default function LoansTable({ open, data }: { open: boolean; data: BorrowedItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${open ? 'max-h-[300px]' : 'max-h-[700px]'} `}>
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-2 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 "
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
            className="border-gray-300 border-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th className="px-6 py-3">الاسم</th>
            <th className="px-6 py-3">تاريخ الخروج</th>
            <th className="px-6 py-3">المسلم</th>
            <th className="px-6 py-3">المسلم له</th>
            <th className="px-6 py-3">السبب</th>
            <th className="px-6 py-3">تم التسليم</th>
            <th className="px-6 py-3">ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.toWhom.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="px-6 py-4 font-medium text-gray-900 ">{item.name}</td>
                <td className="px-6 py-4">{item.createdDate}</td>
                <td className="px-6 py-4">{item.createdUser?.name || "N/A"}</td>
                <td className="px-6 py-4">{item.toWhom}</td>
                <td className="px-6 py-4">{item.notes || "No notes"}</td>
                <td className="px-6 py-4">{item.isReturned ? "تم" : "لم يتم"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

