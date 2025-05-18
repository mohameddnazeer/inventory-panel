import { z } from "zod";

export const ExistedSchema = z.object({
  Name: z.string().min(1, "الاسم مطلوب"),
  ImageFile: z
    .instanceof(File)
    .refine(file => file.size > 0, "الملف مطلوب")
    .optional(),
  // ImageFile: z.instanceof(File).nullable().optional(),
  Brand: z.string().min(1, "الماركة مطلوبة"),
  Serial: z.string().min(1, "السيريال مطلوب"),
  Quantity: z.string().regex(/^\d+$/, "الكمية يجب أن تكون رقم"),
  QuantityEnum: z.enum(["UNIT", "METER"]), // add more options if needed
  Notes: z.string().max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" }).optional(),
  SqId: z.string().min(1, "SqId مطلوب"),
});

export type ExistedFormData = z.infer<typeof ExistedSchema>;
