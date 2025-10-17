import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const ConfirmationModal = ({
  children,
  onCancel,
  onConfirm,
}: {
  children: React.ReactNode;

  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="rounded-lg  sm:p-4 !max-w-xs sm:!max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg font-semibold">
            Confirmation
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col  gap-1">
              <h6 className="text-sm text-black/90 font-medium">
                Are you sure you want to continue ?
              </h6>
              <p className="text-sm ">
                This action is final and cannot be changed after confirmation.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex !flex-row  items-center justify-end gap-2">
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
              onCancel();
            }}
            className="h-8 rounded-sm"
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
            className="h-8 !bg-destructive/90 rounded-sm"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
