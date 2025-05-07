import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo({type}:{type:string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellow">تعديل</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> تعديل عنصر</DialogTitle> 
          <DialogDescription>
            قم بتأكيد الحذف ان كنت ترغب في حذف هذا العنصر
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 2py-4">
            
        </div>
        <DialogFooter>
           <Button type="submit" variant="yellow">تأكيد التعديل</Button>: 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
