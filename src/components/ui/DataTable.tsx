import clsx from "clsx";

export type TableHeader<T> = {
  label: string;
  accessor: any;
  render?: (row: T) => React.ReactNode | string;
};
type Props<T> = {
  header: TableHeader<T>[];
  data: T[];
};
const DataTable = <T,>({ header = [], data = [] }: Props<T>) => {
  if (!header.length) return null;
  return (
    <div className="relative overflow-x-auto rounded-md border border-border bg-card shadow-sm">
      <table className="w-full text-sm border-collapse text-left">
        <thead className="bg-muted/40">
          <tr>
            {header.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-foreground font-semibold border-b border-border"
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={i}
                className={clsx(
                  "transition-colors",
                  i % 2 === 0 ? "bg-muted/20" : "bg-card",
                  "hover:bg-muted/30"
                )}
              >
                {header.map((h, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 text-foreground/90 border-b border-border"
                  >
                    {h.render
                      ? h.render(row)
                      : (row[
                          h.accessor as keyof T
                        ] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={header.length}
                className="px-4 py-6 text-center text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
