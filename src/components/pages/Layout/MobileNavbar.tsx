import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Icon } from "@iconify/react";
import NavigationLinks from "./Links";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Icon icon="mi:menu" width="24" height="24" />
        </SheetTrigger>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent
          className="flex flex-col items-center  border-none pr-2"
          tabIndex={-1}
          side="top"
        >
          <NavigationLinks
            className="!flex md:hidden !flex-col items-center gap-2 p-5"
            onClick={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
