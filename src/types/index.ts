export interface University {
  id: string;
  name: string;
  logo?: string;
}

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
}

export interface Program {
  id: string;
  name: string;
  facultyId: string;
}

export interface Course {
  id: string;
  name: string;
  programId: string;
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  topic: string;
  sourceStatement: string;
  explanation: string;
}