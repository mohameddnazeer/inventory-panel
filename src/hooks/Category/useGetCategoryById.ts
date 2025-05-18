// hooks/ExistedItems/useGetExistedItem.ts
import { CategoryItemResponse } from "@/services/sqCategories/CategoryAddService";
import CategoryGetServiceById from "@/services/sqCategories/CategoryGetServiceById";
import { useQuery } from "@tanstack/react-query";

const useGetCategoryById = (id: number) => {
  return useQuery<CategoryItemResponse, Error>({
    queryKey: ["Category", id],
    queryFn: ({ queryKey }) => {
      const [_key, itemId] = queryKey;
      return CategoryGetServiceById.getItem(itemId as number);
    },
    enabled: !!id,
  });
};

export { useGetCategoryById };
