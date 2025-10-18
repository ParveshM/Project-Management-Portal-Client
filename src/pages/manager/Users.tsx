import AddUser from "@/components/pages/users/AddUser";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import DataTable, { type TableHeader } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import usePermissionCheck from "@/hooks/usePermissionCheck";
import { useAppSelector } from "@/lib/redux/hooks";
import type { ROLES, User } from "@/types";
import { handleApiError } from "@/utils";
import { adminAPI } from "@/utils/api/admin";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const LIMIT = 10;
const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ role: "user" });
  const debounced = useDebounce(search);
  const queryClient = useQueryClient();
  const [canDelete] = usePermissionCheck(["delete"]);
  const { role } = useAppSelector((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["users", debounced, page, filter],
    queryFn: () =>
      adminAPI.getAllUsers({
        q: debounced,
        page,
        limit: LIMIT,
        role: filter.role as ROLES,
      }),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: adminAPI.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const e = handleApiError(err);
      toast.error(e?.message);
    },
  });

  const header: TableHeader<User>[] = [
    { label: "Name", accessor: "name" },
    { label: "Username", accessor: "username" },
    { label: "Role", accessor: "role" },
    {
      label: "CreatedBy",
      accessor: "createdBy",
      render: (row) => row.createdBy?.name || "-",
    },
    {
      label: "Joined Date",
      accessor: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      label: "Actions",
      accessor: "actions",
      render(row) {
        return (
          <div className="flex items-center gap-2 ">
            <AddUser oldData={row}>
              <Button className="rounded-sm h-8 bg-primary/10 hover:bg-primary/20 text-primary">
                <Pencil className="w-4 h-4" />
              </Button>
            </AddUser>
            {canDelete && (
              <ConfirmationModal
                onCancel={() => {}}
                onConfirm={() => deleteUser(row._id)}
              >
                <Button
                  variant={"destructive"}
                  className="rounded-sm h-8 text-destructive bg-destructive/10 hover:bg-destructive/20 "
                >
                  <Icon icon="mdi:bin-outline" className="size-5" />
                </Button>
              </ConfirmationModal>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-lg sm:text-2xl font-medium text-primary">Users</h1>
        <div className="flex gap-2">
          <SearchBar value={search} setValue={setSearch} />
          <AddUser>
            <Button className=" rounded-sm font-medium px-4 h-8">
              Add User
            </Button>
          </AddUser>
        </div>
      </div>
      {role === "admin" && (
        <div className="flex items-end justify-end">
          <Select
            defaultValue={filter.role}
            onValueChange={(v) => setFilter({ role: v })}
          >
            <SelectTrigger className="w-[120px] rounded-sm capitalize">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              {["user", "manager"].map((v) => (
                <SelectItem key={v} value={v} className="capitalize ">
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <DataTable header={header} data={data?.data || []} />
          <Pagination
            totalItems={data?.count || 0}
            currentPage={page}
            setCurrentPage={(page) => setPage(page)}
            itemsPerPage={LIMIT}
          />
        </>
      )}
    </div>
  );
};

export default Users;
