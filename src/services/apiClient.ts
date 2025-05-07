import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://172.16.7.61:9991/",
    headers: {
     "Content-Type": "application/json",
      Authorization:`Bearer ${localStorage.getItem('accessToken')}`
    },
  });

//    Add token dynamically (only on client side)
  // axiosInstance.interceptors.request.use((config) => {
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //   }
  //   return config;
  // });
  
class APIClient<TRequest , TResponse> {
    endpoint:string
    constructor(endpoint:string){
        this.endpoint = endpoint
    }
    getAll = ()=>{
        return axiosInstance.get<TRequest[]>(this.endpoint).then(res=>{
            console.log(res.data)
            return res.data})
    }
    postData = (data:TRequest):Promise<TResponse>=>{
        return axiosInstance.post<TResponse>(this.endpoint,data).then(res =>{
            return res.data
        })
    }
    delete = (id: number | string): Promise<TResponse> => {
      return axiosInstance.delete(`${this.endpoint}/${id}`).then(() => null as TResponse);
    };
    getItem = (id: number | string): Promise<TResponse> => {
      return axiosInstance.delete(`${this.endpoint}/${id}`).then((res) => res.data);
    };
    update = (data: TRequest): Promise<TResponse> => {
      return axiosInstance.put<TResponse>(this.endpoint, data).then(res => res.data);
    };
    // update = (id: number, data: TRequest): Promise<TResponse> => {
    //   const url = `${this.endpoint}/${id}`;
    //   return axiosInstance.put<TResponse>(url, data).then(res => res.data);
    // };
}


export default APIClient


