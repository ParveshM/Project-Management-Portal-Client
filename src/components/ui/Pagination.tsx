import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";

export const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  if (totalItems <= itemsPerPage) return null;
  return (
    <ReactPaginate
      pageCount={Math.ceil(totalItems / itemsPerPage)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      containerClassName="flex gap-1 justify-end mt-2"
      pageClassName="paginate-li border rounded hover:bg-muted/10 cursor-pointer"
      activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
      previousClassName="px-2 py-1 border rounded hover:bg-muted/10 flex items-center justify-center cursor-pointer"
      nextClassName="px-2 py-1 border rounded hover:bg-muted/10 flex items-center justify-center cursor-pointer"
      previousLabel={<ChevronLeft className="size-4" />}
      nextLabel={<ChevronRight className="size-4" />}
      renderOnZeroPageCount={null}
    />
  );
};
