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

import { useDeleteExisteditem } from "@/hooks/ExistedItems/useDeleteExistedItem";
import { useQueryClient } from "@tanstack/react-query";
// adjust this path
import { useState } from "react";

export function DeleteInventoryModal({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteExisteditem();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false); // close modal after successful delete
        return queryClient.invalidateQueries({ queryKey: ["ExistedItems"] });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          حذف
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>حذف عنصر</DialogTitle>
          <DialogDescription>قم بتأكيد الحذف إن كنت ترغب في حذف هذا العنصر</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* Optional: Extra content or message */}</div>
        <DialogFooter>
          <Button onClick={handleDelete} className="cursor-pointer" variant="destructive">
            تأكيد الحذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
