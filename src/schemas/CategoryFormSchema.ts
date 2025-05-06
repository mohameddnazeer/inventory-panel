import z from 'zod'
// Define the validation schema using Zod
export const CategorySchema = z.object({
    Name: z.string().min(2, { message: "الاسم مطلوب" }),
    Number: z.string().min(1, { message: "الرقم مطلوب" }),  // Make sure 'number' is a string if it’s passed as a string input
   
  });
  export type CategoryFormData = z.infer<typeof CategorySchema>;