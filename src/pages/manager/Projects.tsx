import AddProject from "@/components/pages/Projects/AddProject";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import DataTable, { type TableHeader } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import type { Project } from "@/types";
import { handleApiError } from "@/utils";
import { adminAPI } from "@/utils/api/admin";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search);
  const { data, isLoading } = useQuery({
    queryKey: ["projects", debounced, page],
    queryFn: () => adminAPI.getAllprojects({ q: debounced, page, limit: 10 }),
  });
  const queryclient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: adminAPI.deleteProject,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (err) => {
      const e = handleApiError(err);
      toast.error(e?.message);
    },
  });
  const header: TableHeader<Project>[] = [
    {
      label: "Date",
      accessor: "createdAt",
      render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Start Date",
      accessor: "startDate",
      render: (row: any) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      label: "End Date",
      accessor: "endDate",
      render: (row: any) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      label: "Status",
      accessor: "status",
    },

    {
      label: "Actions",
      accessor: "actions",
      render(row) {
        return (
          <div className="flex items-center gap-2 w-fit">
            <AddProject oldData={row}>
              <Button className="rounded-sm h-8 bg-primary/10 hover:bg-primary/20 text-primary">
                <Pencil className="w-4 h-4" />
              </Button>
            </AddProject>
            <ConfirmationModal
              onConfirm={() => mutate(row._id)}
              onCancel={() => {}}
            >
              <Button
                disabled={isPending}
                variant={"destructive"}
                className="rounded-sm h-8 text-destructive bg-destructive/10 hover:bg-destructive/20 "
              >
                <Icon icon="mdi:bin-outline" className="size-5" />
              </Button>
            </ConfirmationModal>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-2xl font-medium text-primary">
          Projects
        </h1>
        <div className="flex gap-2">
          <SearchBar value={search} setValue={setSearch} />
          <AddProject>
            <Button className=" rounded-sm font-medium px-4 h-8">
              Add Project
            </Button>
          </AddProject>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <DataTable header={header} data={data?.data ?? []} />
          <Pagination
            totalItems={data?.count ?? 0}
            setCurrentPage={(page) => setPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default Projects;
