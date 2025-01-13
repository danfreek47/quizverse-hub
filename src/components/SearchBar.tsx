import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4 transition-colors group-hover:text-accent" />
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        className="pl-10 h-12 glass-card text-white/90 placeholder:text-white/50 border-white/10 focus:border-accent/50 focus:ring-accent/20 transition-all duration-300"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};