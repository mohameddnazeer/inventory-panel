import { useQuery } from "@tanstack/react-query";

import dispensedItemsService, {
  DispensedItem,
} from "@/services/dispensedItems/dispensedGetService";
import { PaginationControlsProps } from "@/components/PaginationControls";

const useGetDispensedItems = (page:number , pageSize: number =10) => {
  return useQuery<{data:DispensedItem[], pagination: PaginationControlsProps}, Error>({
    queryKey: ["dispensedItems", page, pageSize],
    queryFn: () => dispensedItemsService.getAllPaginated(page, pageSize),
  });
};

export { useGetDispensedItems };
