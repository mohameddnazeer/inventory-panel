import { z } from "zod";

export const DispencedSchema = z.object({
  dispensedQuantity: z
    .string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && val > 0, {
      message: "الكمية المصروفة يجب أن تكون رقمًا أكبر من 0",
    }),

  existingItemId: z
    .string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && val > 0, {
      message: "رقم العنصر مطلوب",
    }),

  toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
  receiverName: z.string().min(1, "اسم المستلم مطلوب"),
  deliveredName: z.string().min(1, "اسم المسلم مطلوب"),
  notes: z.string().max(100, { message: "الملاحظات يجب ألا تزيد عن 100 حرف" }).optional(),
});

export type DispensedFormData = z.infer<typeof DispencedSchema>;
