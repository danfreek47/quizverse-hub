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
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(['universities', 'faculties', 'programs', 'courses', 'mcqs'] as const).map((item) => (
            <Button
              key={item}
              variant={section === item ? "default" : "outline"}
              onClick={() => setSection(item)}
              className={`w-full capitalize transition-all duration-300 hover:scale-105 ${
                section === item 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50 hover:text-accent'
              }`}
            >
              {item}
            </Button>
          ))}
        </div>

        <Card className="p-8 backdrop-blur-sm bg-white/50 border border-white/20 shadow-xl transition-all duration-300 hover:shadow-primary/10">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-accent capitalize">{section}</h2>
              <Button 
                onClick={handleAdd}
                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Add New
              </Button>
            </div>
            
            <div className="relative">
              <Input
                type="text"
                placeholder={`Search ${section}...`}
                className="w-full bg-white/50 backdrop-blur-sm border border-primary/20 focus:border-primary/50 transition-all duration-300"
              />
            </div>

            <div className="grid gap-4">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/30 backdrop-blur-sm border border-white/20">
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