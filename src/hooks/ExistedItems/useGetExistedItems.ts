import { useQuery } from "@tanstack/react-query";

import existedItemsService, { ExistedItem } from "@/services/existedItems/existedGetService";


const useGetExistedItems = () => {
  return useQuery<ExistedItem[], Error>({
    queryKey: ["ExistedItems"],
    queryFn: existedItemsService.getAll,
  });
};

export { useGetExistedItems };
