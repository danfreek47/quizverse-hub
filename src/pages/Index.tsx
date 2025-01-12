import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SelectionGrid } from "@/components/SelectionGrid";
import { MCQQuestion } from "@/components/MCQQuestion";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
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
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Select Your University</h1>
          <SelectionGrid items={universities} onSelect={setSelectedUniversity} />
        </div>
      );
    }

    if (!selectedFaculty) {
      return (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Your Faculty</h2>
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
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Your Program</h2>
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
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Your Course</h2>
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
          <h3 className="text-xl font-semibold text-gray-700">No MCQs available for this course</h3>
          <p className="text-gray-500 mt-2">Please check back later or select a different course.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Practice Questions</h2>
        {courseMCQs.map((mcq) => (
          <MCQQuestion key={mcq.id} mcq={mcq} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <Link to="/admin">
            <Button variant="outline" className="gap-2">
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