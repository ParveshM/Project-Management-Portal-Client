import AddProject from "@/components/pages/Projects/AddProject";
import { Button } from "@/components/ui/button";
import DataTable, { type TableHeader } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import useDebounce from "@/hooks/useDebounce";
import { Icon } from "@iconify/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
const data = [
  {
    name: "Parvesh M",
    username: "parvesh123",
    email: "parvesh@mail.com",
    role: "Admin",
    manager: { name: "N/A" },
    joinedAt: "2025-10-10T08:30:00Z",
  },
  {
    name: "Maya S",
    username: "mayaS",
    email: "maya@mail.com",
    role: "Manager",
    manager: { name: "Parvesh M" },
    joinedAt: "2025-10-12T10:15:00Z",
  },
  {
    name: "Alex K",
    username: "alexk",
    email: "alex@mail.com",
    role: "User",
    manager: { name: "Maya S" },
    joinedAt: "2025-10-13T12:45:00Z",
  },
  {
    name: "Sara L",
    username: "saraL",
    email: "sara@mail.com",
    role: "User",
    manager: { name: "Maya S" },
    joinedAt: "2025-10-14T09:20:00Z",
  },
];
const header: TableHeader<(typeof data)[0]>[] = [
  { label: "Name", accessor: "name" },
  { label: "Username", accessor: "username" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
  {
    label: "Manager",
    accessor: "manager",
    render: (manager: { name: string }) => manager?.name || "-",
  },
  {
    label: "Joined Date",
    accessor: "joinedAt",
    render: (row: any) => new Date(row.joinedAt).toLocaleDateString(),
  },
  {
    label: "Actions",
    accessor: "actions",
    render() {
      return (
        <div className="flex items-center gap-2">
          <Button className="rounded-sm h-8 bg-primary/10 hover:bg-primary/20 text-primary">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant={"destructive"}
            className="rounded-sm h-8 text-destructive bg-destructive/10 hover:bg-destructive/20 "
          >
            <Icon icon="mdi:bin-outline" className="size-5" />
          </Button>
        </div>
      );
    },
  },
];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search);

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-2xl font-medium text-primary">
          Projects
        </h1>
        <div className="flex gap-2">
          <SearchBar value={search} setValue={setSearch} />
          <AddProject />
        </div>
      </div>

      <DataTable header={header} data={data} />
      <Pagination totalPages={10} setCurrentPage={(page) => setPage(page)} />
    </div>
  );
};

export default Projects;
