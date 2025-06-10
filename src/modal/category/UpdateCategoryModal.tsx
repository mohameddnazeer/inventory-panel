"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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

import { useGetCategoryById } from "@/hooks/Category/useGetCategoryById";
import { CategoryFormData, CategorySchema } from "@/schemas/CategoryFormSchema";
import toast from "react-hot-toast";

// Optional utility for safer token access
const getAccessToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
};

export function UpdateCategoryModal({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetCategoryById(id);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, values }: { id: number; values: CategoryFormData }) => {
      const response = await axios.put(
        `http://172.16.7.61:9991/api/SQs/${id}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
      toast.success("تم التعديل");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(CategorySchema),
  });

  useEffect(() => {
    if (data && open) {
      reset({
        Name: data.name || "",
        Number: data.number?.toString() || "",
      });
    }
  }, [data, open, reset]);

  const onSubmit = (values: CategoryFormData) => {
    mutate({ id, values });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="yellow">تعديل</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تعديل التصنيف</DialogTitle>
          <DialogDescription>قم بتحديث معلومات التصنيف.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>الاسم</Label>
            <Input {...register("Name")} />
            {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
          </div>

          {/* Number */}
          <div>
            <Label>الرقم</Label>
            <Input {...register("Number")} />
            {errors.Number && <p className="text-red-500">{errors.Number.message}</p>}
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
