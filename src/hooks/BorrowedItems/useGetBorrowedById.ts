// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
// import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";
import borrowedGetByIdService, { ItemDetailsResponse } from "@/services/borrowedItems/borrowedGetByIdService";

const useGetBorrowedById = (id: number) => {
  return useQuery<ItemDetailsResponse, Error>({
    queryKey: ['BorrowedItems', id],
    queryFn: ({ queryKey }) => {
      const itemId = queryKey[1] as number;
      return borrowedGetByIdService.getItem(itemId);
    },
    enabled: !!id,
  });
};

export { useGetBorrowedById };
