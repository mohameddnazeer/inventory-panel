// import { z } from "zod";

// export const DispencedSchema = z.object({
//   itemName: z
//     .string()
//     .nonempty({ message: "اسم الصنف مطلوب" })
//     .min(2, { message: "اسم الصنف يجب أن يكون أكثر من حرفين" }),

//   quantity: z
//     .number({
//       required_error: "الكميه مطلوبة",
//       invalid_type_error: "يجب إدخال رقم",
//     })
//     .min(1, { message: "يجب أن تكون الكميه أكبر من 0" }),

//   issueDate: z
//     .string()
//     .nonempty({ message: "تاريخ الصرف مطلوب" })
//     .refine((val) => !isNaN(Date.parse(val)), {
//       message: "تاريخ غير صالح",
//     }),

//   issuedTo: z
//     .string()
//     .nonempty({ message: "اسم المصروف له مطلوب" })
//     .min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),

//   deliveredBy: z
//     .string()
//     .nonempty({ message: "اسم المسلم مطلوب" })
//     .min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),

//   deliveredTo: z
//     .string()
//     .nonempty({ message: "اسم المسلم له مطلوب" })
//     .min(2, { message: "الاسم يجب أن يكون أكثر من حرفين" }),

//   serial: z
//     .string()
//     .nonempty({ message: "السيريال مطلوب" })
//     .min(2, { message: "السيريال يجب أن يكون أكثر من حرفين" }),

//   notes: z
//     .string()
//     .max(1000, { message: "الملاحظات يجب ألا تزيد عن 1000 حرف" })
//     .optional(),
// });

// export type DispensedFormData = z.infer<typeof DispencedSchema>;


// import { z } from "zod";

// export const DispencedSchema = z.object({
//   dispensedQuantity: z.number().min(1, "الكمية المصروفة يجب أن تكون رقمًا أكبر من 0"),
//   toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
//   receiverName: z.string().min(1, "اسم المستلم مطلوب"),
//   deliveredName: z.string().min(1, "اسم المسلم مطلوب"),
//   notes: z.string().optional(),
//   existingItemId: z.number().min(1, "رقم العنصر مطلوب"),
// });



import { z } from "zod";

export const DispencedSchema = z.object({
  dispensedQuantity: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "الكمية المصروفة يجب أن تكون رقمًا أكبر من 0",
    }),

  existingItemId: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "رقم العنصر مطلوب",
    }),

  toWhom: z.string().min(1, "اسم المسلم له مطلوب"),
  receiverName: z.string().min(1, "اسم المستلم مطلوب"),
  deliveredName: z.string().min(1, "اسم المسلم مطلوب"),
  notes: z.string().optional(),
});

export type DispensedFormData = z.infer<typeof DispencedSchema>;