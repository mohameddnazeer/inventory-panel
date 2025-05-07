// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";

const useGetExistedItem = (id: number) => {
  return useQuery<InventoryItemResponse, Error>({
    queryKey: ['ExistedItems', id],
    queryFn: ({ queryKey }) => {
      const [_key, itemId] = queryKey;
      return existedGetItemService.getItem(itemId as number);
    },
    enabled: !!id,
  });
};

export { useGetExistedItem };