import {  useQuery } from "@tanstack/react-query";

import sqCategoryService, { CategoryItem } from "@/services/sqCategories/CategoryGetService";
import { PaginationControlsProps } from "@/components/PaginationControls";
// import { CategoryFormData } from "@/app/dashboard/categories/page";

const useGetCategory = (page: number =1, pageSize: number =10)=>{
    return useQuery<{data:CategoryItem[], pagination: PaginationControlsProps} , Error>({
        queryKey: ['Category',page, pageSize],
        queryFn: () => sqCategoryService.getAllPaginated(page, pageSize),
      });
}


export  {useGetCategory}

// accessToken