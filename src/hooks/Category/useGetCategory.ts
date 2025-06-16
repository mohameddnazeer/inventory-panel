import {  useQuery } from "@tanstack/react-query";

import sqCategoryService, { CategoryItem } from "@/services/sqCategories/CategoryGetService";
import { PaginationControlsProps } from "@/components/PaginationControls";
// import { CategoryFormData } from "@/app/dashboard/categories/page";

const useGetCategory = (page: number =1, pageSize: number =10,searchTerm: string ="")=>{
    return useQuery<{data:CategoryItem[], pagination: PaginationControlsProps} , Error>({
        queryKey: ['Category',page, pageSize,searchTerm],
        queryFn: () => sqCategoryService.getAllPaginated(page, pageSize,searchTerm),
      });
}


export  {useGetCategory}

// accessToken