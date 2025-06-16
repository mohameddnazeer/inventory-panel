import { useQuery } from "@tanstack/react-query";

import existedItemsService, { ExistedItem } from "@/services/existedItems/existedGetService";
import { PaginationControlsProps } from "@/components/PaginationControls";


const useGetExistedItems = (page: number=1, pageSize: number = 10) => {
  return useQuery<{ data: ExistedItem[]; pagination: PaginationControlsProps }, Error>({
    queryKey: ["ExistedItems", page, pageSize],
    queryFn: () => existedItemsService.getAllPaginated(page, pageSize),
    // keepPreviousData: true,
  });
};

export { useGetExistedItems };
