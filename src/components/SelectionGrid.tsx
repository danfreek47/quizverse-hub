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
          className="group relative overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer glass-card"
          onClick={() => onSelect(item.id)}
        >
          <div className="relative z-10">
            {item.logo && (
              <img
                src={item.logo}
                alt={item.name}
                className="w-16 h-16 mb-4 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            )}
            <h3 className="text-lg font-semibold text-center text-white/90 group-hover:text-white transition-colors">
              {item.name}
            </h3>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
      ))}
    </div>
  );
};