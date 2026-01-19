import { create } from 'zustand';
import type { ExamState, Question } from '../types/exam';
import { calculateTotalScore, hasPassed } from '../utils/scoring';
import examData from '../data/questions.json';

interface ExamStore extends ExamState {
  // Actions
  startExam: () => void;
  startExercise: () => void;
  toggleAnswer: (questionId: number, answerIndex: number) => void;
  checkAnswer: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  finishExam: () => void;
  resetExam: () => void;
}

const initialState: ExamState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  isStarted: false,
  isFinished: false,
  isExerciseMode: false,
  showFeedback: false,
  startTime: null,
  endTime: null,
  score: null,
  maxScore: null,
  passed: null,
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Selektiert zufällige Fragen basierend auf Chapter
 */
function selectExamQuestions(allQuestions: Question[]): Question[] {
  // Pool 1: Chapter beginnt mit "1" -> 15 zufällige
  const chapter1Questions = allQuestions.filter((q) =>
    q.chapter.startsWith('1')
  );
  const selectedChapter1 = shuffleArray(chapter1Questions).slice(0, 15);

  // Pool 2: Chapter beginnt mit "2" -> 20 zufällige
  const chapter2Questions = allQuestions.filter((q) =>
    q.chapter.startsWith('2')
  );
  const selectedChapter2 = shuffleArray(chapter2Questions).slice(0, 20);

  // Kombiniere und mische final
  return shuffleArray([...selectedChapter1, ...selectedChapter2]);
}

export const useExamStore = create<ExamStore>((set, get) => ({
  ...initialState,

  /**
   * Startet ein neues Exam
   * - Wählt 15 Fragen aus Chapter 1 und 20 aus Chapter 2
   * - Mischt sie zufällig
   */
  startExam: () => {
    const allQuestions = examData.questions as Question[];
    const examQuestions = selectExamQuestions(allQuestions);

    set({
      questions: examQuestions,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isStarted: true,
      isFinished: false,
      isExerciseMode: false,
      showFeedback: false,
      startTime: Date.now(),
      endTime: null,
      score: null,
      maxScore: null,
      passed: null,
    });
  },

  /**
   * Startet Exercise Mode
   * - Alle Fragen gemischt
   */
  startExercise: () => {
    const allQuestions = examData.questions as Question[];
    const shuffledQuestions = shuffleArray([...allQuestions]);

    set({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isStarted: true,
      isFinished: false,
      isExerciseMode: true,
      showFeedback: false,
      startTime: Date.now(),
      endTime: null,
      score: null,
      maxScore: null,
      passed: null,
    });
  },

  /**
   * Prüft die Antwort und zeigt Feedback (nur Exercise Mode)
   */
  checkAnswer: () => {
    const { isExerciseMode } = get();
    if (isExerciseMode) {
      set({ showFeedback: true });
    }
  },

  /**
   * Toggle eine Antwort für die aktuelle Frage
   * - Single Choice & True/False: Nur eine Antwort erlaubt
   * - Multiple Choice: Mehrere Antworten möglich
   */
  toggleAnswer: (questionId: number, answerIndex: number) => {
    const { questions, selectedAnswers } = get();
    const question = questions.find((q) => q.id === questionId);
    
    if (!question) return;

    const currentAnswers = selectedAnswers[questionId] || [];
    let newAnswers: number[];

    if (question.type === 'single_choice' || question.type === 'true_false') {
      // Single Selection: Toggle oder ersetze
      if (currentAnswers.includes(answerIndex)) {
        newAnswers = []; // Deselect
          } else {
        newAnswers = [answerIndex]; // Select (ersetzt vorherige)
      }
    } else {
      // Multiple Choice: Toggle
      if (currentAnswers.includes(answerIndex)) {
        newAnswers = currentAnswers.filter((i) => i !== answerIndex);
      } else {
        newAnswers = [...currentAnswers, answerIndex];
      }
    }

    set({
      selectedAnswers: {
        ...selectedAnswers,
        [questionId]: newAnswers,
      },
    });
  },

  /**
   * Nächste Frage
   */
  nextQuestion: () => {
    const { currentQuestionIndex, questions, isExerciseMode } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ 
        currentQuestionIndex: currentQuestionIndex + 1,
        showFeedback: false, // Reset feedback für nächste Frage
      });
    }
  },

  /**
   * Vorherige Frage
   */
  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  /**
   * Springe zu einer bestimmten Frage
   */
  goToQuestion: (index: number) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  /**
   * Beende das Exam und berechne Score
   */
  finishExam: () => {
    const { questions, selectedAnswers } = get();
    
    const { score, maxScore } = calculateTotalScore(
      questions,
      selectedAnswers
    );
    
    const passed = hasPassed(score, maxScore);

    set({
      isFinished: true,
      endTime: Date.now(),
      score,
      maxScore,
      passed,
    });
  },

  /**
   * Reset komplett
   */
  resetExam: () => {
    set(initialState);
  },
}));
