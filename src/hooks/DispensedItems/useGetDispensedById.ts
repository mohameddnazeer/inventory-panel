// hooks/ExistedItems/useGetExistedItem.ts
import { useQuery } from "@tanstack/react-query";
// import existedGetItemService, { InventoryItemResponse } from "@/services/existedItems/existedGetByIdService";
// import { ItemDetailsResponse } from "@/services/borrowedItems/borrowedGetByIdService";
import dispensedGetById, { DispensedResponse } from "@/services/dispensedItems/dispensedGetById";

const useGetDispensedById = (id: number) => {
  return useQuery<DispensedResponse, Error>({
    queryKey: ["dispensedItems", id],
    queryFn: ({ queryKey }) => {
      const itemId = queryKey[1] as number;
      return dispensedGetById.getItem(itemId);
    },
    enabled: !!id,
  });
};

export { useGetDispensedById };
