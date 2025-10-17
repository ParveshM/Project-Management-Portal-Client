import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { navLinks } from "@/constants";
import { NavItem } from "@/components/pages/Layout/NavItem";

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
          <ul className="flex flex-col items-center gap-2 p-5">
            {navLinks.map((link, i) => (
              <NavItem key={i} {...link} onClick={() => setIsOpen(false)} />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
