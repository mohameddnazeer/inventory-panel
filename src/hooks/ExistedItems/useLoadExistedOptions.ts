import existedItemsService from "@/services/existedItems/existedGetService";

export const useLoadExistedOptions = () => {
  return async (
    inputValue: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadedOptions: any[],
    { page }: { page: number }
  ) => {
    const res = await existedItemsService.getAllPaginated(page, 10, inputValue);

    const options = res.data.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));
    console.log("Loaded options:", options);

    return {
      options,
      hasMore: res.pagination.TotalPages > page,
      additional: {
        page: page + 1,
      },
    };
  };
};
