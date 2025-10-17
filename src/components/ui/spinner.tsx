import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div
      className={cn(
        className,
        "min-h-[50dvh] flex items-center justify-center"
      )}
    >
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin")}
        {...props}
      />
    </div>
  );
}

export { Spinner };
