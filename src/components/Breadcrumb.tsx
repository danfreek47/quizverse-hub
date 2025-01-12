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
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          <button
            onClick={item.onClick}
            className="hover:text-primary transition-colors"
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};