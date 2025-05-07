// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import existedAddService, { ExistedItemResponse } from "@/services/existedItems/existedAddService";
// import { ExistedFormData } from "@/schemas/ExistedFormSchema";



// const useUpdateExistedItems = ()=>{
 
//     return useMutation<ExistedItemResponse , Error , ExistedFormData>({
//         mutationFn: existedAddService.update,
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