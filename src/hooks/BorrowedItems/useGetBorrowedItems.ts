import borrowedItemsService, { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";
import { useQuery } from "@tanstack/react-query";

const useGetBorrowedItems = () => {
  return useQuery<BorrowedItem[], Error>({
    queryKey: ["BorrowedItems"],
    queryFn: borrowedItemsService.getAll,
  });
};

export { useGetBorrowedItems };

// accessToken
