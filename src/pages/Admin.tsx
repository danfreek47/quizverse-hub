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
    <div className="min-h-screen bg-gradient-soft p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {(['universities', 'faculties', 'programs', 'courses', 'mcqs'] as const).map((item) => (
            <Button
              key={item}
              variant={section === item ? "default" : "outline"}
              onClick={() => setSection(item)}
              className="w-full capitalize"
            >
              {item}
            </Button>
          ))}
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold capitalize">{section}</h2>
              <Button onClick={handleAdd}>Add New</Button>
            </div>
            
            <div className="relative">
              <Input
                type="text"
                placeholder={`Search ${section}...`}
                className="w-full"
              />
            </div>

            <div className="grid gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow">
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