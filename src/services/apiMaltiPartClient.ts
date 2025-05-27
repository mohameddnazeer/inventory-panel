'use client';

import axios, { AxiosInstance } from "axios";

// Create axios instance dynamically with latest token
const createAxiosInstance = (): AxiosInstance => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return axios.create({
    baseURL: "http://172.16.7.61:9991/",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // no Content-Type here, axios sets it automatically for FormData
    },
  });
};

class APIMultiPartClient<TRequest, TResponse> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  uploadFile = async (data: TRequest): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.post<TResponse>(this.endpoint, data);
    return res.data;
  };

  postData = async (data: TRequest): Promise<TResponse> => {
    const axiosInstance = createAxiosInstance();
    const res = await axiosInstance.post<TResponse>(this.endpoint, data);
    return res.data;
  };
}

export default APIMultiPartClient;
