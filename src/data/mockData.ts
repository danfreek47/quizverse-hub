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
      explanation: "QuickSort has an average time complexity of O(n log n) because it divides the array into two parts in each recursive step (log n) and needs to process all elements (n). The partitioning process ensures that elements are divided around a pivot, making it efficient for most real-world scenarios.",
    },
    {
      id: "2",
      question: "Which data structure is most suitable for implementing a priority queue?",
      options: [
        { id: "1", text: "Array", isCorrect: false },
        { id: "2", text: "Linked List", isCorrect: false },
        { id: "3", text: "Binary Heap", isCorrect: true },
        { id: "4", text: "Stack", isCorrect: false },
      ],
      topic: "Data Structures",
      sourceStatement: "Chapter 4: Priority Queues - Data Structures and Algorithms",
      explanation: "A Binary Heap is the most efficient data structure for implementing a priority queue because it maintains the heap property (parent nodes are always greater/smaller than children) and provides O(log n) time complexity for both insertion and deletion operations.",
    },
  ],
};