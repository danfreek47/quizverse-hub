import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SelectionGrid } from "@/components/SelectionGrid";
import { MCQQuestion } from "@/components/MCQQuestion";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
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
        <SelectionGrid items={universities} onSelect={setSelectedUniversity} />
      );
    }

    if (!selectedFaculty) {
      return (
        <>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search faculties..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedFaculty} />
        </>
      );
    }

    if (!selectedProgram) {
      return (
        <>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search programs..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedProgram} />
        </>
      );
    }

    if (!selectedCourse) {
      return (
        <>
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search courses..."
          />
          <SelectionGrid items={filteredItems} onSelect={setSelectedCourse} />
        </>
      );
    }

    const courseMCQs = mcqs[selectedCourse] || [];
    if (courseMCQs.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No MCQs available for this course</h3>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {courseMCQs.map((mcq) => (
          <MCQQuestion key={mcq.id} mcq={mcq} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container py-8 space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumb items={getBreadcrumbItems()} />
          <Link to="/admin">
            <Button variant="outline">Admin Panel</Button>
          </Link>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;