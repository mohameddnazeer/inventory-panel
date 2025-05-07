// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";
import borrowedGetByIdService, { ItemDetailsResponse } from "@/services/borrowedItems/borrowedGetByIdService";

const useGetBorrowedById = (id: number) => {
  return useQuery<ItemDetailsResponse, Error>({
    queryKey: ['BorrowedItmes', id],
    queryFn: ({ queryKey }) => {
      const [_key, itemId] = queryKey;
      return borrowedGetByIdService.getItem(itemId as number);
    },
    // enabled: !!id,
  });
};

export { useGetBorrowedById };