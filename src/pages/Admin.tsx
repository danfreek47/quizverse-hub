import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [section, setSection] = useState<'universities' | 'faculties' | 'programs' | 'courses' | 'mcqs'>('universities');

  const handleAdd = () => {
    toast({
      title: "Not implemented",
      description: "Please connect Supabase to enable admin functionality",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold gradient-text animate-fade-in">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 animate-fade-in">
          {(['universities', 'faculties', 'programs', 'courses', 'mcqs'] as const).map((item) => (
            <Button
              key={item}
              variant={section === item ? "default" : "outline"}
              onClick={() => setSection(item)}
              className={`w-full capitalize transition-all duration-300 hover:scale-105 ${
                section === item 
                  ? 'bg-gradient-dark text-primary-foreground shadow-lg border border-white/10' 
                  : 'hover:bg-secondary/20 hover:text-accent glass-card'
              }`}
            >
              {item}
            </Button>
          ))}
        </div>

        <Card className="glass-card p-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white capitalize">{section}</h2>
              <Button 
                onClick={handleAdd}
                className="bg-gradient-dark hover:bg-gradient-dark/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Add New
              </Button>
            </div>
            
            <div className="relative">
              <Input
                type="text"
                placeholder={`Search ${section}...`}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 focus:border-white/20 transition-all duration-300"
              />
            </div>

            <div className="grid gap-4">
              <Card className="glass-card p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <p className="text-muted-foreground">
                  Connect Supabase to enable admin functionality
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;