import { useQuery } from "@tanstack/react-query";

import existedItemsService, { ExistedItem } from "@/services/existedItems/existedGetService";


const useGetExistedItmes = ()=>{

    return useQuery< ExistedItem[] , Error>({
        queryKey: ['existedItems'],
        queryFn: existedItemsService.getAll
      });
}


export  {useGetExistedItmes}