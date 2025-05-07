import {  useQuery } from "@tanstack/react-query";
import borrowedItemsService, { BorrowedItem } from "@/services/borrowedItems/borrowedGetService";

const useGetBorrowedItems = ()=>{
    return useQuery<BorrowedItem[] , Error>({
        queryKey: ['BorrowedItmes'],
        queryFn: borrowedItemsService.getAll
      });
}


export  {useGetBorrowedItems}

// accessToken