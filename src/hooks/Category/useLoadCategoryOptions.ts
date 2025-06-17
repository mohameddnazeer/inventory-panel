import sqCategoryService from "@/services/sqCategories/CategoryGetService";

export const useLoadCategoryOptions = () => {
  return async (
    inputValue: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadedOptions: any[],
    { page }: { page: number }
  ) => {
    const res = await sqCategoryService.getAllPaginated(page, 10, inputValue);
    const options = res.data.map((item) => ({
      value: String(item.id),
      label: item.name,
    }));

    return {
      options,
      hasMore: res.pagination.TotalPages > page,
      additional: {
        page: page + 1,
      },
    };
  };
};
