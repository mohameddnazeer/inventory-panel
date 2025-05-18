import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountsResponse {
  existingCount: number;
  dispensedCount: number;
  borrowedCount: number;
}

interface ApiCountResponse {
  totalCount: number;
}

const fetchCounts = async (): Promise<CountsResponse> => {
  const token = localStorage.getItem("accessToken");
  const baseUrl = "http://172.16.7.61:9991/api";
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const [existingRes, dispensedRes, borrowedRes] = await Promise.all([
      axios.get<ApiCountResponse>(`${baseUrl}/ExistingItems/count`, { headers }),
      axios.get<ApiCountResponse>(`${baseUrl}/DispensedItems/count`, { headers }),
      axios.get<ApiCountResponse>(`${baseUrl}/BorrowedItems/count`, { headers }),
    ]);

    return {
      existingCount: existingRes.data.totalCount,
      dispensedCount: dispensedRes.data.totalCount,
      borrowedCount: borrowedRes.data.totalCount,
    };
  } catch (error) {
    console.error("Error fetching counts:", error);

    return {
      existingCount: 0,
      dispensedCount: 0,
      borrowedCount: 0,
    };
  }
};

export const useGetItemsCounts = () => {
  return useQuery<CountsResponse, Error>({
    queryKey: ["itemsCounts"],
    queryFn: fetchCounts,
  });
};
