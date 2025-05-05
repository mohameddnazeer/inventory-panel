import {  useQuery } from "@tanstack/react-query";
import borrowedItemsService, { BorrowedItem } from "@/services/borrowedItems/borrowedItemsService";

const useGetBorrowedItems = ()=>{
    return useQuery<BorrowedItem[] , Error>({
        queryKey: ['borrowedItmes'],
        queryFn: borrowedItemsService.getAll
      });
}


export  {useGetBorrowedItems}

// accessToken