import { Card } from "@/components/ui/card";

interface SelectionGridProps {
  items: Array<{
    id: string;
    name: string;
    logo?: string;
  }>;
  onSelect: (id: string) => void;
}

export const SelectionGrid = ({ items, onSelect }: SelectionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {items.map((item) => (
        <Card
          key={item.id}
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelect(item.id)}
        >
          {item.logo && (
            <img
              src={item.logo}
              alt={item.name}
              className="w-16 h-16 mb-4 mx-auto"
            />
          )}
          <h3 className="text-lg font-semibold text-center">{item.name}</h3>
        </Card>
      ))}
    </div>
  );
};