'use client';

import { zodResolver } from "@hookform/resolvers/zod";
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetExistedItem } from "@/hooks/ExistedItems/useGetExistedItem";
import { ExistedFormData, ExistedSchema } from "@/schemas/ExistedFormSchema";
import axios from "axios";
import toast from "react-hot-toast";

// Utility to safely get the token from localStorage
const getAccessToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
};

export function UpdateInventoryModal({ id, sqId }: { id: number; sqId: number }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetExistedItem(id);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await axios.put(
        `http://172.16.7.61:9991/api/ExistingItems/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExistedFormData>({
    resolver: zodResolver(ExistedSchema),
  });

  useEffect(() => {
    if (data && open) {
      reset({
        Name: data.name || "",
        Brand: data.brand || "",
        Serial: data.serial || "",
        Quantity: data.quantity?.toString() || "",
        QuantityEnum: data.quantityEnum || "UNIT",
        Notes: data.notes || "",
        SqId: sqId.toString(),
      });
    }
  }, [data, open, reset, sqId]);

  const onSubmit = (values: ExistedFormData) => {
    const formData = new FormData();

    formData.append("Name", values.Name);
    formData.append("Brand", values.Brand);
    formData.append("Serial", values.Serial);
    formData.append("Quantity", values.Quantity);
    formData.append("QuantityEnum", values.QuantityEnum);
    formData.append("SqId", values.SqId);

    if (values.Notes) {
      formData.append("Notes", values.Notes);
    }

    if (values.ImageFile) {
      formData.append("ImageFile", values.ImageFile);
    }

    mutate(
      { id, formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ExistedItems"] });
          toast.success("تم التعديل بنجاح");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="yellow">تعديل</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تعديل عنصر</DialogTitle>
          <DialogDescription>قم بتحديث معلومات العنصر.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>الاسم</Label>
            <Input {...register("Name")} />
            {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
          </div>

          {/* Brand */}
          <div>
            <Label>الماركة</Label>
            <Input {...register("Brand")} />
            {errors.Brand && <p className="text-red-500">{errors.Brand.message}</p>}
          </div>

          {/* Serial */}
          <div>
            <Label>السيريال</Label>
            <Input {...register("Serial")} />
            {errors.Serial && <p className="text-red-500">{errors.Serial.message}</p>}
          </div>

          {/* Quantity */}
          <div>
            <Label>الكمية</Label>
            <Input {...register("Quantity")} />
            {errors.Quantity && <p className="text-red-500">{errors.Quantity.message}</p>}
          </div>

          {/* QuantityEnum */}
          <div>
            <Label>نوع الكمية</Label>
            <select {...register("QuantityEnum")} className="w-full border rounded px-2 py-1 text-black">
              <option value="UNIT">وحدة</option>
              <option value="METER">متر</option>
            </select>
            {errors.QuantityEnum && <p className="text-red-500">{errors.QuantityEnum.message}</p>}
          </div>

          {/* SqId (read-only) */}
          <div>
            <Label>SqId</Label>
            <Input disabled {...register("SqId")} />
            {errors.SqId && <p className="text-red-500">{errors.SqId.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <Label>ملاحظات</Label>
            <Input {...register("Notes")} />
            {errors.Notes && <p className="text-red-500">{errors.Notes.message}</p>}
          </div>

          {/* ImageFile (optional) */}
          {/* 
          <div>
            <Label>الصورة</Label>
            <Input type="file" {...register("ImageFile")} />
            {errors.ImageFile && <p className="text-red-500">{errors.ImageFile.message}</p>}
          </div>
          */}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "جارٍ التحديث..." : "حفظ التعديلات"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
