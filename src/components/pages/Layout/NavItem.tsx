import type { navLinks } from "@/constants";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export const NavItem = ({
  name,
  path,
  ...rest
}: (typeof navLinks)[number] & React.ComponentProps<"li">) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  return (
    <li {...rest}>
      <Link
        to={path}
        className={clsx(
          "flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-sm",
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
        )}
      >
        {name}
      </Link>
    </li>
  );
};
