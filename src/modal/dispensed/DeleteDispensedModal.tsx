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
// import { useDeleteCategory } from "@/hooks/Category/useDeleteCategory";
import { useDeleteDispensedItem } from "@/hooks/DispensedItems/useDeleteDispensedItem";
// adjust this path
import { useState } from "react";

export function DeleteDispensedModal({ id }: { id: number }) {
  const { mutate } = useDeleteDispensedItem();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false); // close modal after successful delete
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">حذف</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>حذف عنصر</DialogTitle>
          <DialogDescription>قم بتأكيد الحذف إن كنت ترغب في حذف هذا العنصر</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* Optional: Extra content or message */}</div>
        <DialogFooter>
          <Button onClick={handleDelete} variant="destructive" className="cursor-pointer">
            تأكيد الحذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
