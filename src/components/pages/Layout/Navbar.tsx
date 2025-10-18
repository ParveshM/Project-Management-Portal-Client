import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import MobileHeader from "./MobileNavbar";
import { useAppSelector } from "@/lib/redux/hooks";
import useLogout from "@/hooks/useLogout";
import NavigationLinks from "./Links";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const { handleLogout } = useLogout();

  return (
    <header className="flex items-center justify-between gap-2 h-16 p-4 border-b fixed inset-x-0 z-50 backdrop-blur-3xl">
      <div></div>
      <NavigationLinks />

      <div className="flex gap-4 items-center ">
        <MobileHeader />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" border-2 border-ring/20">
              <AvatarFallback className="text-lg font-medium cursor-pointer">
                {user.name ? user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3">
            <DropdownMenuLabel>Hello, {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={handleLogout}
            >
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
