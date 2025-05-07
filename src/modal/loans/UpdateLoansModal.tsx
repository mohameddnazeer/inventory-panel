'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { BorrowedFormData, BorrowedSchema } from '@/schemas/BorrowedFormSchema';
import { useGetBorrowedById } from '@/hooks/BorrowedItems/useGetBorrowedById';
import { useUpdateBorrowedItems } from '@/hooks/BorrowedItems/useUpdateBorrowedItems';

export function UpdateLoansModal({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false);

  const { data } = useGetBorrowedById(id);
  const {mutate , isPending}  =  useUpdateBorrowedItems()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BorrowedSchema),
  });

  // Prefill data when dialog opens
  useEffect(() => {
    if (data && open) {
      reset({
        name: data.name || '',
        toWhom: data.toWhom || '',
        isReturned: data.isReturned ? 'true' : 'false',
        notes: data.notes || '',
      });
    }
  }, [data, open, reset]);

  const onSubmit = (values: BorrowedFormData) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('toWhom', values.toWhom);
    formData.append('isReturned', values.isReturned ? 'true' : 'false');
    if (values.notes) {
      formData.append('notes', values.notes);
    }

    mutate(
      { id, formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['BorrowedItems'] });
          setOpen(false);
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
          <DialogTitle>تعديل بيانات الإعارة</DialogTitle>
          <DialogDescription>قم بتحديث معلومات الإعارة أدناه.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>اسم العنصر</Label>
            <Input {...register('name')} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* To Whom */}
          <div>
            <Label>اسم المستلم</Label>
            <Input {...register('toWhom')} />
            {errors.toWhom && <p className="text-red-500">{errors.toWhom.message}</p>}
          </div>

          {/* Is Returned */}
          <div>
            <Label>تم الإرجاع؟</Label>
            <select {...register('isReturned')} className="w-full border rounded px-2 py-1">
              <option value="">اختر الحالة</option>
              <option value="true">تم الإرجاع</option>
              <option value="false">لم يتم الإرجاع</option>
            </select>
            {errors.isReturned && <p className="text-red-500">{errors.isReturned.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <Label>ملاحظات</Label>
            <Input {...register('notes')} />
            {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'جارٍ التحديث...' : 'حفظ التعديلات'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
