// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";

const useGetExistedItem = (id: number) => {
  return useQuery<InventoryItemResponse, Error>({
    queryKey: ['ExistedItems', id],
    queryFn: ({ queryKey }) => {
      const itemId = queryKey[1] as number;
      return existedGetItemService.getItem(itemId);
    },
    enabled: !!id,
  });
};

export { useGetExistedItem };