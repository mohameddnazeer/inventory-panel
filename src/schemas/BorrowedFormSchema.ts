import { z } from "zod";

export const BorrowedSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "الاسم مطلوب" })
    .min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),

    toWhom: z
    .string()
    .nonempty({ message: "اسم المسلم له مطلوب" })
    .min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),

    isReturned: z
    .enum(["yes", "no"], {
      errorMap: () => ({ message: "يرجى اختيار حالة التسليم" }),
    }),

    notes: z
    .string()
    .max(1000, { message: "الملاحظات يجب ألا تزيد عن 1000 حرف" }).optional(),
});

export type BorrowedFormData = z.infer<typeof BorrowedSchema>;
