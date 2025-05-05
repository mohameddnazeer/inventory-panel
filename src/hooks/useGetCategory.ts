import {  useQuery } from "@tanstack/react-query";

import sqCategoryService, { CategoryItem } from "@/services/sqCategories/sqCategoryService";
// import { CategoryFormData } from "@/app/dashboard/categories/page";

const useGetCategory = ()=>{
    return useQuery<CategoryItem[] , Error>({
        queryKey: ['Category'],
        queryFn: sqCategoryService.getAll
      });
}


export  {useGetCategory}

// accessToken