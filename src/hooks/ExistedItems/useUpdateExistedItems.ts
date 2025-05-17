// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import existedAddService, { ExistedItemResponse } from "@/services/existedItems/existedAddService";
// import { ExistedFormData } from "@/schemas/ExistedFormSchema";



// const useUpdateExistedItems = ()=>{
 
//     return useMutation<null , Error , {id:number ; formData:ExistedFormData}>({
//         mutationFn: existedAddService.updateExistedItem,
//         onSuccess: (data) => {
//          console.log('successed updateing  items')
//          console.log(data)
        
//         },
//         onError: (error) => {
//           console.error("Login failed:", error);
//         }
//       });
// }


// export  {useUpdateExistedItems}