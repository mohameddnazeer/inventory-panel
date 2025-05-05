// import { useMutation } from "@tanstack/react-query";

// import loginUserService from "@/services/userServices/loginUserService";
// import { useRouter } from "next/navigation";
// import { LoginFormData } from "@/schemas/loginFormSchema";
// import { AddItemFormData } from "@/schemas/loginFormSchema";
// import borrowedItemsService from "@/services/borrowedItems/borrowedItemsService";


// type ResponseData = {
//   accessToken: string;
//   refreshToken: string;
 
// };


// const useAddBorrowedItems = ()=>{
//     const router = useRouter()
//     return useMutation<null , Error , AddItemFormData>({
//         mutationFn: borrowedItemsService.postData,
//         onSuccess: (data) => {
//           localStorage.setItem('accessToken', JSON.stringify(data));
//           router.push('/dashboard')
//         },
//         onError: (error) => {
//           console.error("Login failed:", error);
//         }
//       });
// }


// export  {useAddBorrowedItems}