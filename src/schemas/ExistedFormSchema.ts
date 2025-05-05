import { z } from "zod";

export const ExistedSchema = z.object({
  Name: z.string().min(1, "الاسم مطلوب"),
  ImageFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "الملف مطلوب"),
  Brand: z.string().min(1, "الماركة مطلوبة"),
  Serial: z.string().min(1, "السيريال مطلوب"),
  Quantity: z.string().regex(/^\d+$/, "الكمية يجب أن تكون رقم"),
  QuantityEnum: z.enum(['UNIT', 'KG', 'LITER']), // add more options if needed
  Notes: z.string().optional(),
  SqId: z.string().min(1, "SqId مطلوب"),
});

export type ExistedFormData = z.infer<typeof ExistedSchema>;