import type { Question, QuestionScore } from '../types/exam';

/**
 * Berechnet den Score für eine einzelne Frage nach Eurex-Regeln
 * 
 * @param question - Die Frage mit korrekten Antworten
 * @param userAnswers - Array von Indizes, die der User ausgewählt hat
 * @returns QuestionScore mit Punkten und Bewertung
 */
export function calculateScore(
  question: Question,
  userAnswers: number[]
): QuestionScore {
  const { type, answers, id } = question;

  // True/False & Single Choice: 2 Punkte wenn korrekt, sonst 0
  if (type === 'true_false' || type === 'single_choice') {
    const correctIndex = answers.findIndex((a) => a.correct);
    const isCorrect = 
      userAnswers.length === 1 && userAnswers[0] === correctIndex;

    return {
      questionId: id,
      points: isCorrect ? 2 : 0,
      maxPoints: 2,
      isCorrect,
    };
  }

  // Multiple Choice: Komplexere Bewertung
  if (type === 'multiple_choice') {
    let points = 0;

    // Für jede mögliche Antwort:
    for (let i = 0; i < answers.length; i++) {
      const isCorrectAnswer = answers[i].correct;
      const userSelected = userAnswers.includes(i);

      // +1 wenn korrekt angekreuzt ODER korrekt leer gelassen
      if (isCorrectAnswer && userSelected) {
        points += 1; // Richtig angekreuzt
      } else if (!isCorrectAnswer && !userSelected) {
        points += 1; // Richtig leer gelassen
      } else {
        points -= 1; // Falsch
      }
    }

    // Min 0, Max 4 Punkte
    const finalPoints = Math.max(0, Math.min(4, points));
    const isCorrect = finalPoints === 4;

    return {
      questionId: id,
      points: finalPoints,
      maxPoints: 4,
      isCorrect,
    };
  }

  // Fallback (sollte nie erreicht werden)
  return {
    questionId: id,
    points: 0,
    maxPoints: 0,
    isCorrect: false,
  };
}

/**
 * Berechnet den Gesamt-Score für alle Fragen
 * 
 * @param questions - Alle Fragen im Exam
 * @param selectedAnswers - Record von questionId -> selected answer indices
 * @returns Gesamt-Score und maximale Punkte
 */
export function calculateTotalScore(
  questions: Question[],
  selectedAnswers: Record<number, number[]>
): { score: number; maxScore: number; percentage: number } {
  let totalScore = 0;
  let totalMaxScore = 0;

  for (const question of questions) {
    const userAnswers = selectedAnswers[question.id] || [];
    const result = calculateScore(question, userAnswers);
    
    totalScore += result.points;
    totalMaxScore += result.maxPoints;
  }

  const percentage = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

  return {
    score: totalScore,
    maxScore: totalMaxScore,
    percentage: Math.round(percentage * 100) / 100, // 2 Dezimalstellen
  };
}

/**
 * Prüft ob der User bestanden hat (>= 75%)
 */
export function hasPassed(score: number, maxScore: number): boolean {
  if (maxScore === 0) return false;
  const percentage = (score / maxScore) * 100;
  return percentage >= 75;
}
