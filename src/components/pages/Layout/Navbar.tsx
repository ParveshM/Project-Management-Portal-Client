import { NavItem } from "@/components/pages/Layout/NavItem";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/constants";
import { Icon } from "@iconify/react";
import MobileHeader from "./MobileNavbar";
import { useAppSelector } from "@/lib/redux/hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <header className="flex items-center justify-between gap-2 h-16 p-4 border-b fixed inset-x-0 z-50 backdrop-blur-3xl">
      <div></div>

      <ul className="hidden md:flex items-center gap-4 ">
        {navLinks.map((link, i) => (
          <NavItem key={i} {...link} />
        ))}
      </ul>
      <div className="flex gap-4 items-center ">
        <MobileHeader />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" border-2 border-ring/20">
              <AvatarFallback className="text-lg font-medium cursor-pointer">
                N
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3">
            <DropdownMenuLabel>Hello, {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Logout
              <Icon icon="material-symbols:logout-rounded" className="size-5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
