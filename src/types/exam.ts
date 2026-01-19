/**
 * TypeScript type definitions for Eurex Exam Data
 */

export interface ExamInfo {
  title: string;
  version: string;
  date: string;
  valid_from: string;
  duration_minutes: number;
  total_questions: number;
  pass_percentage: number;
  languages: string[];
}

export interface Chapter {
  number: number;
  title: string;
  true_false: number;
  multiple_choice: number;
  single_choice: number;
  total: number;
  points: number;
}

export interface QuestionType {
  true_false: string;
  multiple_choice: string;
  single_choice: string;
}

export interface ExamStructure {
  chapters: Chapter[];
  question_types: QuestionType;
}

export interface Answer {
  text: string;
  correct: boolean;
}

export interface TableData {
  headers?: string[];
  rows: (string | number)[][];
  note?: string;
}

export interface Question {
  id: number;
  chapter: string;
  type: 'multiple_choice' | 'single_choice' | 'true_false';
  question: string;
  answers: Answer[];
  table?: TableData;
}

export interface ExamData {
  exam_info: ExamInfo;
  exam_structure: ExamStructure;
  questions: Question[];
}

/**
 * Exam State - Der komplette Zustand der App
 */
export interface ExamState {
  // Fragen für diese Exam Session
  questions: Question[];
  
  // Aktueller Index
  currentQuestionIndex: number;
  
  // User Antworten: Map von questionId -> array von answer indices
  selectedAnswers: Record<number, number[]>;
  
  // Exam Status
  isStarted: boolean;
  isFinished: boolean;
  
  // Exercise Mode
  isExerciseMode: boolean;
  showFeedback: boolean;
  
  // Timer
  startTime: number | null;
  endTime: number | null;
  
  // Results
  score: number | null;
  maxScore: number | null;
  passed: boolean | null;
}

/**
 * Score Result für eine einzelne Frage
 */
export interface QuestionScore {
  questionId: number;
  points: number;
  maxPoints: number;
  isCorrect: boolean;
}
