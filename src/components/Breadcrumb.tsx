import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
          <button
            onClick={item.onClick}
            className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};