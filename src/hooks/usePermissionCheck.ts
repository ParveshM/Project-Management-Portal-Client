import { ROLE_PERMISSIONS, type CRUD_Actions } from "@/constants";
import { useAppSelector } from "@/lib/redux/hooks";
import { useLocation } from "react-router-dom";

export default function usePermissionCheck(
  actionsArr: CRUD_Actions[],
  module?: string
) {
  const { pathname } = useLocation();
  const { role } = useAppSelector((state) => state.user);
  const keyToSearch = module || pathname.split("/")[1];

  const allowedPermissions = actionsArr.map((action) => {
    const permissions = ROLE_PERMISSIONS[role!][keyToSearch];
    if (!permissions || !permissions.length) return false;
    return permissions.includes(action);
  });
  return allowedPermissions;
}
