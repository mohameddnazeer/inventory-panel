import {  useQuery } from "@tanstack/react-query";

import dispensedItemsService, { DispensedItem } from "@/services/dispensedItems/dispensedGetService";


const useGetDispensedItems = ()=>{
    return useQuery< DispensedItem[],Error>({
        queryKey: ['dispensedItems'],
        queryFn: dispensedItemsService.getAll
      });
}


export  {useGetDispensedItems}