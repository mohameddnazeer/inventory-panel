import borrowedItemsService, { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";
import { useQuery } from "@tanstack/react-query";

const useGetBorrowedItems = (page: number =1 , pageSize: number =10) => {
  return useQuery<{data: BorrowedItem[], pagination:any}, Error>({
    queryKey: ["BorrowedItems",page, pageSize],
    queryFn: () => borrowedItemsService.getAllPaginated(page, pageSize),
  });
};

export { useGetBorrowedItems };

// accessToken
