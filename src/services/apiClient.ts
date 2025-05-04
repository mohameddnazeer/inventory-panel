import axios from 'axios';


// 'http://172.16.7.61:9991/api/Users/login'
const axiosInstance = axios.create({
    baseURL:'http://172.16.7.61:9991/',
    headers:{
    "Content-Type" : "application/json",
    // Authorization:"YOUR_SECRET_TOKEN"
   }
})


class APIClient<T> {
    endpoint:string
    
    constructor(endpoint:string){
        this.endpoint = endpoint
    }
    // getAll = ()=>{
    //     return axiosInstance.get<T[]>(this.endpoint).then(res=>res.data)
    // }
    loginUser = (data:T)=>{
        return axiosInstance.post<T>(this.endpoint , data).then(res=>res.data)
    }
}


export default APIClient