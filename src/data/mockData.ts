import { University, Faculty, Program, Course, MCQ } from "@/types";

export const universities: University[] = [
  {
    id: "1",
    name: "Harvard University",
    logo: "/placeholder.svg",
  },
  {
    id: "2",
    name: "MIT",
    logo: "/placeholder.svg",
  },
];

export const faculties: Faculty[] = [
  {
    id: "1",
    name: "School of Engineering",
    universityId: "1",
  },
  {
    id: "2",
    name: "School of Science",
    universityId: "1",
  },
];

export const programs: Program[] = [
  {
    id: "1",
    name: "Computer Science",
    facultyId: "1",
  },
  {
    id: "2",
    name: "Electrical Engineering",
    facultyId: "1",
  },
];

export const courses: Course[] = [
  {
    id: "1",
    name: "Data Structures",
    programId: "1",
  },
  {
    id: "2",
    name: "Algorithms",
    programId: "1",
  },
];

export const mcqs: Record<string, MCQ[]> = {
  "1": [
    {
      id: "1",
      question: "What is the time complexity of QuickSort in the average case?",
      options: [
        { id: "1", text: "O(n)", isCorrect: false },
        { id: "2", text: "O(n log n)", isCorrect: true },
        { id: "3", text: "O(n²)", isCorrect: false },
        { id: "4", text: "O(log n)", isCorrect: false },
      ],
      topic: "Sorting Algorithms",
      sourceStatement: "Chapter 3: Algorithm Analysis - Introduction to Algorithms",
    },
    // Add more MCQs as needed
  ],
};