import { PaginationControlsProps } from "@/components/PaginationControls";
import borrowedItemsService, { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";
import { useQuery } from "@tanstack/react-query";

const useGetBorrowedItems = (page: number =1 , pageSize: number =10, searchTerm:string ="") => {
  return useQuery<{data: BorrowedItem[], pagination:PaginationControlsProps}, Error>({
    queryKey: ["BorrowedItems",page, pageSize,searchTerm],
    queryFn: () => borrowedItemsService.getAllPaginated(page, pageSize,searchTerm),
  });
};

export { useGetBorrowedItems };

// accessToken
