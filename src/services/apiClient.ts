import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.16.7.61:9991/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

class APIClient<TRequest, TResponse> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = () => {
    return axiosInstance.get<TRequest[]>(this.endpoint).then(res => {
      console.log(res.data);
      return res.data;
    });
  };
  postData = (data: TRequest): Promise<TResponse> => {
    return axiosInstance.post<TResponse>(this.endpoint, data).then(res => {
      return res.data;
    });
  };
  delete = (id: number | string): Promise<TResponse> => {
    return axiosInstance.delete(`${this.endpoint}/${id}`).then(() => null as TResponse);
  };
  getItem = (id: number | string): Promise<TResponse> => {
    return axiosInstance.get(`${this.endpoint}/${id}`).then(res => res.data);
  };

  updateBorrowedItems = ({
    id,
    formData,
  }: {
    id: number;
    formData: BorrowedFormData;
  }): Promise<TResponse> => {
    const url = `${this.endpoint}/${id}`;

    return axiosInstance.put<TResponse>(url, formData).then(res => res.data);
  };
  updateDispensedItems = ({
    id,
    formData,
  }: {
    id: number;
    formData: DispensedFormData;
  }): Promise<TResponse> => {
    const url = `${this.endpoint}/${id}`;

    return axiosInstance.put<TResponse>(url, formData).then(res => res.data);
  };
}

export default APIClient;
