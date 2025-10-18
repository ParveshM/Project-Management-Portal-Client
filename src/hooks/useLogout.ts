import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slice/userSlice";
import { removeItem } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const dipatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dipatch(logout());
    removeItem("accessToken");
    navigate("/login");
  };
  return { handleLogout };
}
