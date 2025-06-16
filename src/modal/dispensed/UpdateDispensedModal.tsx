"use client";

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

import { useGetDispensedById } from "@/hooks/DispensedItems/useGetDispensedById";
import { useUpdateDispensed } from "@/hooks/DispensedItems/useUpdateDispensed";
import { DispencedSchema, DispensedFormData } from "@/schemas/DispensedFormSchema";


export function UpdateDispensedModal({
  id,
  existingItemId,
}: {
  id: number;
  existingItemId: number;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data } = useGetDispensedById(id);
  const { mutate, isPending } = useUpdateDispensed();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(DispencedSchema),
  });

  // Prefill data when dialog opens
  useEffect(() => {
    if (data && open) {
      reset({
        dispensedQuantity: data.dispensedQuantity?.toString() || "",
        toWhom: data.toWhom || "",
        receiverName: data.receiverName || "",
        deliveredName: data.deliveredName || "",
        notes: data.notes || "",
        existingItemId: existingItemId?.toString() || "",
      });
    }
  }, [data, open, reset,existingItemId]);

  const onSubmit = (values: DispensedFormData) => {


    mutate(
      { id, formData: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["DispensedItems"] });
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
            <Label>الكميه المصروفة</Label>
            <Input {...register("dispensedQuantity")} />
            {errors.dispensedQuantity && (
              <p className="text-red-500">{errors.dispensedQuantity.message}</p>
            )}
          </div>
          {/* To Whom */}
          <div>
            <Label>اسم المسلم له </Label>
            <Input {...register("toWhom")} />
            {errors.toWhom && <p className="text-red-500">{errors.toWhom.message}</p>}
          </div>
          <div>
            <Label> اسم المستلم</Label>
            <Input {...register("receiverName")} />
            {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
          </div>
          <div>
            <Label>اسم المسلم </Label>
            <Input {...register("deliveredName")} />
            {errors.deliveredName && <p className="text-red-500">{errors.deliveredName.message}</p>}
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
