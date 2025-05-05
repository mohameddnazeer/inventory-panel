import {  useQuery } from "@tanstack/react-query";

import sqCategoryService, { CategoryItem } from "@/services/sqCategories/CategoryGetService";
// import { CategoryFormData } from "@/app/dashboard/categories/page";

const useGetCategory = ()=>{
    return useQuery<CategoryItem[] , Error>({
        queryKey: ['Category'],
        queryFn: sqCategoryService.getAll
      });
}


export  {useGetCategory}

// accessToken