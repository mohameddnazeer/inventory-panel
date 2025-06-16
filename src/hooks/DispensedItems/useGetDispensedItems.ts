import { useQuery } from "@tanstack/react-query";

import dispensedItemsService, {
  DispensedItem,
} from "@/services/dispensedItems/dispensedGetService";
import { PaginationControlsProps } from "@/components/PaginationControls";

const useGetDispensedItems = (page:number , pageSize: number =10,searchTerm:string ="") => {
  return useQuery<{data:DispensedItem[], pagination: PaginationControlsProps}, Error>({
    queryKey: ["dispensedItems", page, pageSize,searchTerm],
    queryFn: () => dispensedItemsService.getAllPaginated(page, pageSize,searchTerm),
  });
};

export { useGetDispensedItems };
