import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SelectionGrid } from "@/components/SelectionGrid";
import { MCQQuestion } from "@/components/MCQQuestion";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Settings, GraduationCap, BookOpen } from "lucide-react";
import {
  universities,
  faculties,
  programs,
  courses,
  mcqs,
} from "@/data/mockData";

const Index = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getBreadcrumbItems = () => {
    const items = [
      {
        label: "Universities",
        onClick: () => {
          setSelectedUniversity(null);
          setSelectedFaculty(null);
          setSelectedProgram(null);
          setSelectedCourse(null);
        },
      },
    ];

    if (selectedUniversity) {
      const university = universities.find((u) => u.id === selectedUniversity);
      items.push({
        label: university?.name || "",
        onClick: () => {
          setSelectedFaculty(null);
          setSelectedProgram(null);
          setSelectedCourse(null);
        },
      });
    }

    if (selectedFaculty) {
      const faculty = faculties.find((f) => f.id === selectedFaculty);
      items.push({
        label: faculty?.name || "",
        onClick: () => {
          setSelectedProgram(null);
          setSelectedCourse(null);
        },
      });
    }

    if (selectedProgram) {
      const program = programs.find((p) => p.id === selectedProgram);
      items.push({
        label: program?.name || "",
        onClick: () => {
          setSelectedCourse(null);
        },
      });
    }

    if (selectedCourse) {
      const course = courses.find((c) => c.id === selectedCourse);
      items.push({
        label: course?.name || "",
        onClick: () => {},
      });
    }

    return items;
  };

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!selectedUniversity) {
      return universities;
    }
    if (!selectedFaculty) {
      return faculties
        .filter((f) => f.universityId === selectedUniversity)
        .filter((f) => f.name.toLowerCase().includes(query));
    }
    if (!selectedProgram) {
      return programs
        .filter((p) => p.facultyId === selectedFaculty)
        .filter((p) => p.name.toLowerCase().includes(query));
    }
    if (!selectedCourse) {
      return courses
        .filter((c) => c.programId === selectedProgram)
        .filter((c) => c.name.toLowerCase().includes(query));
    }
    return [];
  }, [
    selectedUniversity,
    selectedFaculty,
    selectedProgram,
    selectedCourse,
    searchQuery,
  ]);

  const renderContent = () => {
    if (!selectedUniversity) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-12">
            <GraduationCap className="w-16 h-16 mx-auto text-[#1E90FF] animate-bounce" />
            <h1 className="text-4xl font-bold gradient-text">
              Welcome to QuizVerse Hub
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Your comprehensive platform for academic excellence. Select your university to begin your learning journey.
            </p>
          </div>
          <SelectionGrid items={universities} onSelect={setSelectedUniversity} />
        </div>
      );
    }

    if (!selectedFaculty) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-8">
            <BookOpen className="w-12 h-12 mx-auto text-[#00CED1]" />
            <h2 className="text-3xl font-semibold text-white/90">Choose Your Faculty</h2>
          </div>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search faculties..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedFaculty} />
        </div>
      );
    }

    if (!selectedProgram) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-semibold text-white/90">Select Your Program</h2>
            <p className="text-white/70">Explore specialized programs tailored to your academic goals</p>
          </div>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search programs..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedProgram} />
        </div>
      );
    }

    if (!selectedCourse) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-semibold text-white/90">Choose Your Course</h2>
            <p className="text-white/70">Browse through our comprehensive course catalog</p>
          </div>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search courses..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedCourse} />
        </div>
      );
    }

    const courseMCQs = mcqs[selectedCourse] || [];
    if (courseMCQs.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto p-8 glass-card rounded-lg">
            <h3 className="text-xl font-semibold text-white/90 mb-4">No MCQs Available</h3>
            <p className="text-white/70">
              We're currently working on adding questions for this course. Please check back later or select a different course.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-white/90 mb-4">Practice Questions</h2>
          <p className="text-white/70">Test your knowledge with our curated MCQs</p>
        </div>
        {courseMCQs.map((mcq) => (
          <MCQQuestion key={mcq.id} mcq={mcq} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center glass-card p-4 rounded-lg">
          <div className="flex-1">
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <Link to="/admin">
            <Button variant="outline" className="gap-2 hover:bg-white/5 transition-colors duration-300 glass-card">
              <Settings className="w-4 h-4" />
              Admin Panel
            </Button>
          </Link>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
