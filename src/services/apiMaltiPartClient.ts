
import axios from "axios";
 // we don't need a "Content-Type" axios generate it automatically while using a FormData 
const axiosInstance = axios.create({
  baseURL: "http://172.16.7.61:9991/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

class APIMaltiPartClient<TRequest, TResponse> {
    endpoint: string;
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
    
    uploadFile = (data: TRequest): Promise<TResponse> => {
      return axiosInstance.post<TResponse>(this.endpoint, data).then(res => {
        return res.data;
      });
    };

    postData = (data: TRequest): Promise<TResponse> => {
    return axiosInstance.post<TResponse>(this.endpoint, data).then(res => {
      return res.data;
    });
    };
}

export default APIMaltiPartClient;
