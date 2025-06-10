import { z } from "zod";

export const LoginSchema = z.object({
    UserName: z
      .string()
      .nonempty({ message: 'الاسم مطلوب' })
      .min(4, { message: 'الاسم يجب ألا يقل عن 4 حرف' })
      .max(20, { message: 'الاسم يجب ألا يزيد عن 20 حرفًا' }),
  
    password: z
      .string()
      .nonempty({ message: 'الباسورد مطلوب' })
      .min(8, { message: 'الباسورد يجب ألا يقل عن 8 احرف' })
      .max(20, { message: 'الباسورد يجب ألا يزيد عن 20 حرفًا' }),
  
  });
  
  //  Infer TypeScript type from schema
  export type LoginFormData = z.infer<typeof LoginSchema>;