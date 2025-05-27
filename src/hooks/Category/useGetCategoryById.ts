// hooks/ExistedItems/useGetExistedItem.ts
import { CategoryItemResponse } from "@/services/sqCategories/CategoryAddService";
import CategoryGetServiceById from "@/services/sqCategories/CategoryGetServiceById";
import { useQuery } from "@tanstack/react-query";

const useGetCategoryById = (id: number) => {
  return useQuery<CategoryItemResponse, Error>({
    queryKey: ["Category", id],
    queryFn: ({ queryKey }) => {
      const itemId = queryKey[1] as number;
      return CategoryGetServiceById.getItem(itemId);
    },
    enabled: !!id,
  });
};

export { useGetCategoryById };
