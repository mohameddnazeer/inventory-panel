'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetBorrowedById } from "@/hooks/BorrowedItems/useGetBorrowedById";
import { useUpdateBorrowedItems } from "@/hooks/BorrowedItems/useUpdateBorrowedItems";
import { BorrowedFormData, BorrowedSchema } from "@/schemas/BorrowedFormSchema";

export function UpdateLoansModal({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data } = useGetBorrowedById(id);
  const { mutate, isPending } = useUpdateBorrowedItems();

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(BorrowedSchema),
  });

  // Prefill data when dialog opens
  useEffect(() => {
    if (data && open) {
      reset({
        name: data.name || "",
        toWhom: data.toWhom || "",
        isReturned: data.isReturned ? "true" : "false",
        notes: data.notes || "",
      });
    }
  }, [data, open, reset]);

  const onSubmit = (values: BorrowedFormData) => {
    console.log("value from on submit ", values);

    mutate(
      { id, formData: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["BorrowedItems"] });
          setOpen(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="yellow">
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تعديل بيانات الإعارة</DialogTitle>
          <DialogDescription>قم بتحديث معلومات الإعارة أدناه.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>اسم العنصر</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* To Whom */}
          <div>
            <Label>اسم المستلم</Label>
            <Input {...register("toWhom")} />
            {errors.toWhom && <p className="text-red-500">{errors.toWhom.message}</p>}
          </div>

          {/* Is Returned */}
          <div>
            <Label>تم الإرجاع؟</Label>
            <select {...register("isReturned")} className="w-full border rounded px-2 py-1">
              <option value="">اختر الحالة</option>
              <option value="true">تم الإرجاع</option>
              <option value="false">لم يتم الإرجاع</option>
            </select>
            {errors.isReturned && <p className="text-red-500">{errors.isReturned.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <Label>ملاحظات</Label>
            <Input {...register("notes")} />
            {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending || !isDirty} >
              {isPending ? "جارٍ التحديث..." : "حفظ التعديلات"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
