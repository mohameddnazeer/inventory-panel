// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
// import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";
// import { ItemDetailsResponse } from "@/services/borrowedItems/borrowedGetByIdService";
import dispensedGetById, { DispencedResponse } from "@/services/dispensedItems/dispensedGetById";

const useGetDispensedById = (id: number) => {
  return useQuery<DispencedResponse, Error>({
    queryKey: ["dispensedItems", id],
    queryFn: ({ queryKey }) => {
      const [_key, itemId] = queryKey;
      return dispensedGetById.getItem(itemId as number);
    },
    enabled: !!id,
  });
};

export { useGetDispensedById };
