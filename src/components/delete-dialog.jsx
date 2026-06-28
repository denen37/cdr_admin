import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeleteCallMutation } from "@/services/callApi"

export const DeleteDialog = ({item, children}) => {
    const [ remove ] = useDeleteCallMutation();

      const handleDelete = async () => {
        try {
          const response = await remove(item.id).unwrap();
      
          window.alert("Delete successful")

          // console.log(response)
      } catch (error) {
          console.log(error)
          if(error.status == 403){
              window.alert("Forbidden: You do not have permission to perform this action")
          }else if(error.status == 403){
              window.alert("Unauthorized !")
          }else{
              window.alert("Delete Failed! Something went wrong")
          }
      }
    }

    return (
        <Dialog>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete {item.callerName}?</DialogTitle>
              <DialogDescription>
                
              </DialogDescription>
            </DialogHeader>
                <p>Are you sure you want to delete this record? Know this this cannot be reversed</p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="destructive" onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    )
}