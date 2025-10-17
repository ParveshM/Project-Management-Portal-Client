import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";

export const Pagination = ({
  totalPages,
  setCurrentPage,
}: {
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) => (
  <ReactPaginate
    pageCount={totalPages}
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    onPageChange={({ selected }) => setCurrentPage(selected + 1)}
    containerClassName="flex gap-1 justify-end mt-2"
    pageClassName="px-3 py-1 border rounded hover:bg-muted/10"
    activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
    previousClassName="px-2 py-1 border rounded hover:bg-muted/10 flex items-center justify-center"
    nextClassName="px-2 py-1 border rounded hover:bg-muted/10 flex items-center justify-center"
    previousLabel={<ChevronLeft className="size-4" />}
    nextLabel={<ChevronRight className="size-4" />}
    renderOnZeroPageCount={null}
  />
);
