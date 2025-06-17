"use client";

import { PaginationControlsProps } from "@/components/PaginationControls";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";
import axios, { AxiosInstance } from "axios";

// Function to create Axios instance with dynamic Authorization header
const createAxiosInstance = (): AxiosInstance => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // development  http://172.16.7.61:9995 =>1
  // production  http://172.16.7.61:9995 =>5
  return axios.create({
    baseURL: "http://172.16.7.61:9995/",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

class APIClient<TRequest, TResponse> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<TRequest[]> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.get<TRequest[]>(this.endpoint);
    return res.data;
  };

  getAllPaginated = async (
    page: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{ data: TRequest[]; pagination: PaginationControlsProps }> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.get<TRequest[]>(
      `${this.endpoint}?PageNumber=${page}&PageSize=${pageSize}&SearchTerm=${searchTerm}`
    );

    const paginationHeader = res.headers["x-pagination"];
    const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

    return {
      data: res.data,
      pagination,
    };
  };

  postData = async (data: TRequest): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.post<TResponse>(this.endpoint, data);
    return res.data;
  };

  delete = async (id: number | string): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    await axiosInstance.delete(`${this.endpoint}/${id}`);
    return null as TResponse;
  };

  getItem = async (id: number | string): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.get<TResponse>(`${this.endpoint}/${id}`);
    return res.data;
  };

  updateBorrowedItems = async ({
    id,
    formData,
  }: {
    id: number;
    formData: BorrowedFormData;
  }): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.put<TResponse>(
      `${this.endpoint}/${id}`,
      formData
    );
    return res.data;
  };

  updateDispensedItems = async ({
    id,
    formData,
  }: {
    id: number;
    formData: DispensedFormData;
  }): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.put<TResponse>(
      `${this.endpoint}/${id}`,
      formData
    );
    return res.data;
  };
}

export default APIClient;
