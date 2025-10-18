import { navLinks, ROLE_PERMISSIONS } from "@/constants";
import { useAppSelector } from "@/lib/redux/hooks";
import { NavItem } from "./NavItem";
import clsx from "clsx";

const NavigationLinks = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const user = useAppSelector((state) => state.user);
  const routes = Object.keys(ROLE_PERMISSIONS[user.role!]);
  return (
    <ul className={clsx("hidden md:flex items-center gap-4", className)}>
      {navLinks
        .filter((link) => routes.includes(link.name.toLocaleLowerCase()))
        .map((link, i) => (
          <NavItem key={i} {...link} onClick={onClick} />
        ))}
    </ul>
  );
};

export default NavigationLinks;
