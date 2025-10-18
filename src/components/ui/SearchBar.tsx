import { Search } from "lucide-react";
import { Input } from "./input";
import { memo } from "react";

const SearchBar = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-input h-8 relative">
      <Search className="size-4 text-primary absolute left-2 top-2" />
      <Input
        type="text"
        placeholder="Search..."
        className="border-none pl-8"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      />
    </div>
  );
};

export default memo(SearchBar);
