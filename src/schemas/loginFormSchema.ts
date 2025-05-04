import { z } from "zod";

export const schema = z.object({
    UserName: z
      .string()
      .nonempty({ message: 'الاسم مطلوب' })
      .min(6, { message: 'الاسم يجب ألا يقل عن 6 حرف' })
      .max(20, { message: 'الاسم يجب ألا يزيد عن 20 حرفًا' }),
  
    password: z
      .string()
      .nonempty({ message: 'الباسورد مطلوب' })
      .min(8, { message: 'الباسورد يجب ألا يقل عن 8 احرف' })
      .max(20, { message: 'الباسورد يجب ألا يزيد عن 20 حرفًا' }),
  
  });
  
  //  Infer TypeScript type from schema
  export type LoginFormData = z.infer<typeof schema>;