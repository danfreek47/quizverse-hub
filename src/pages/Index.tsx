import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SelectionGrid } from "@/components/SelectionGrid";
import { MCQQuestion } from "@/components/MCQQuestion";
import {
  universities,
  faculties,
  programs,
  courses,
  mcqs,
} from "@/data/mockData";

const Index = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    null
  );
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);

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

  const renderContent = () => {
    if (!selectedUniversity) {
      return (
        <SelectionGrid items={universities} onSelect={setSelectedUniversity} />
      );
    }

    if (!selectedFaculty) {
      const filteredFaculties = faculties.filter(
        (f) => f.universityId === selectedUniversity
      );
      return <SelectionGrid items={filteredFaculties} onSelect={setSelectedFaculty} />;
    }

    if (!selectedProgram) {
      const filteredPrograms = programs.filter(
        (p) => p.facultyId === selectedFaculty
      );
      return <SelectionGrid items={filteredPrograms} onSelect={setSelectedProgram} />;
    }

    if (!selectedCourse) {
      const filteredCourses = courses.filter(
        (c) => c.programId === selectedProgram
      );
      return <SelectionGrid items={filteredCourses} onSelect={setSelectedCourse} />;
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
      <MCQQuestion
        mcq={courseMCQs[currentMCQIndex]}
        onNext={() => {
          if (currentMCQIndex < courseMCQs.length - 1) {
            setCurrentMCQIndex(currentMCQIndex + 1);
          }
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 space-y-6">
        <Breadcrumb items={getBreadcrumbItems()} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;