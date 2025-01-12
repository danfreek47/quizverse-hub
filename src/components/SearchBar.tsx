import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary focus:ring-primary/20"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};