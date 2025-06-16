
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

import ValidationInput from "@/components/ValidationInput";
import { useGetCategory } from "@/hooks/Category/useGetCategory";
import { DeleteCategoryModal } from "@/modal/category/DeleteCategoryModal";
import { UpdateCategoryModal } from "@/modal/category/UpdateCategoryModal";
import { CategoryFormData, CategorySchema } from "@/schemas/CategoryFormSchema";
import { useAddCategory } from "@/hooks/Category/useAddCategory";
import { jwtDecode } from "jwt-decode";
import { PaginationControls } from "@/components/PaginationControls";

interface TableData {
  name: string;
  number: string;
  createdByUserId: string;
  createdUser?: string | null;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser?: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

interface MyFormFields {
  Name: string;
  Number: string;
}


export interface DecodedJWT {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
  exp: number
  iss: string
  aud: string
}
export default function CategoryPage() {
  const [role, setRole] =useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tableData  } = useGetCategory(page, pageSize,searchTerm);
  console.log("Table Data:", tableData);
  const paginationInfo = tableData?.pagination || {
    CurrentPage: page,
    TotalPages: 1,
    PageSize: pageSize,
    TotalRecords: 0,
    HasPrivous: false,
    HasNext: false,
  };
  
  const { mutate: addCategory } = useAddCategory()
  // const mutation = useMutation({
  //   mutationFn: async (formData: FormData) => {
  //     const response = await axios.post("http://172.16.7.61:9991/api/SQs", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ` + localStorage.getItem("accessToken"),
  //       },
  //     });
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //    
  //     queryClient.invalidateQueries({ queryKey: ["Category"] });
  //     reset();
  //   },
  // });

  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  // Handle form submission
  const handleManualSubmit = (data: CategoryFormData) => {

    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Number", String(data.Number));
    addCategory(formData, {
      onSuccess: () => {
        reset()
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token){
      const decoded : DecodedJWT = jwtDecode(token);

      
      const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setRole(roleClaim);
    }
  },[]);

  return (
    <div className="p-0 w-full">
      <h1 className="text-2xl font-bold mb-2 flex items-center justify-between p-1">
        <span className="text-blue-700 flex items-center gap-2">📦 صفحة الاصناف</span>
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowRight className="w-4 h-4" />
          رجوع
        </Link>
      </h1>

      {/* Toggle Form Button */}
      <button
        type="button"
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition cursor-pointer"
      >
        {isFormOpen ? "إخفاء الفورم" : "إظهار الفورم"}
      </button>

      {/* Manual Entry Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit(handleManualSubmit)}
          className="bg-gray-50 shadow p-3 rounded-lg mb-2 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ValidationInput<MyFormFields>
              label="الاسم"
              placeholder="ادخل الاسم"
              type="text"
              name="Name"
              register={register}
              error={errors.Name?.message}
            />

            <ValidationInput<MyFormFields>
              label="الرقم"
              placeholder="ادخل الرقم"
              type="number"
              name="Number"
              register={register}
              error={errors.Number?.message}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center mt-1 gap-4">
            <button
              type="submit"
              className="cursor-pointer w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              إضافة يدويًا
            </button>
          </div>
        </form>
      )}

      {/* Table Display */}
      <div
        className={`overflow-x-auto bg-white overflow-y-scroll p-4 ${!isFormOpen ? "h-[75vh]" : "h-[66vh]"
          }  border border-gray-200 rounded-lg shadow`}
      >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-lg w-[10%] font-semibold text-gray-700">
          جدول الاصناف
        </h2>
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
            placeholder="ابحث عن اسم الصنف   "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
        <table className="w-full text-sm text-right text-gray-600 border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold">المعرف</th>
              <th className="px-4 py-3 text-xs font-semibold">الاسم</th>
              <th className="px-4 py-3 text-xs font-semibold">الرقم</th>
              <th className="px-4 py-3 text-xs font-semibold">تاريخ الإنشاء</th>
              <th className="px-4 py-3 text-xs font-semibold text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  لا توجد بيانات حاليًا.
                </td>
              </tr>
            ) : (
              tableData?.data.map((item: TableData, idx: number) => (
                <tr
                  key={item.id}
                  className="bg-white hover:bg-blue-50 border-b transition duration-150"
                >
                  <td className="px-4 py-3 font-medium">{idx + 1}</td>
                  <td className="px-4 py-3">{item.name || "—"}</td>
                  <td className="px-4 py-3">{item.number || "—"}</td>
                  <td className="px-4 py-3">
                    {item.createdDate
                      ? new Date(item.createdDate).toLocaleDateString("ar-EG")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {role === "Admin"? (
                      <div className="flex justify-center gap-2">
                      <button
                        className=" text-white text-xs font-medium  shadow-sm transition cursor-pointer"
                        
                      >
                        <UpdateCategoryModal id={item.id} />
                      </button>
                      <button
                        className=" text-white text-xs font-medium  shadow-sm transition"
                        
                      >
                        <DeleteCategoryModal id={item.id} />
                      </button>
                    </div>
                    ):(
                      <p>لا يمكنك اتخاذ اي اجراء</p>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <PaginationControls 
        CurrentPage={paginationInfo.CurrentPage}
        TotalPages={paginationInfo.TotalPages}
        HasPrivous={paginationInfo.HasPrivous}
        HasNext={paginationInfo.HasNext}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
