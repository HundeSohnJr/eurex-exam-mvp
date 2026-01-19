import { ChevronRight, Home, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { QuestionCard } from './QuestionCard';
import { calculateScore } from '../utils/scoring';

export function ExerciseView() {
  const { 
    questions, 
    currentQuestionIndex, 
    selectedAnswers,
    showFeedback,
    checkAnswer,
    nextQuestion,
    resetExam
  } = useExamStore();
  
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswers = selectedAnswers[currentQuestion?.id];
  const hasAnswer = userAnswers && userAnswers.length > 0;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400">Keine Frage gefunden</p>
        </div>
      </div>
    );
  }

  // Berechne Score wenn Feedback angezeigt wird
  const result = showFeedback ? calculateScore(currentQuestion, userAnswers || []) : null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen pb-32">
      <div className="container-mobile py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-sm text-slate-400">Practice Mode</span>
            <p className="text-sm font-semibold" style={{ color: '#00D9B5' }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <button
            onClick={resetExam}
            className="btn gap-2"
            style={{
              backgroundColor: 'rgba(100, 116, 139, 0.3)',
              color: 'rgb(241, 245, 249)',
              minHeight: '40px',
              padding: '0 1rem',
            }}
          >
            <Home className="w-4 h-4" />
            Main Menu
          </button>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />

        {/* Feedback Section */}
        {showFeedback && result && (
          <div className="mt-6 card p-6">
            <div className="flex items-start gap-3 mb-4">
              {result.isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#00D9B5' }} />
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: '#00D9B5' }}>
                      Correct! 🎉
                    </h3>
                    <p className="text-sm text-slate-300">
                      You scored {result.points} out of {result.maxPoints} points.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <h3 className="font-bold text-lg text-red-400">
                      Incorrect
                    </h3>
                    <p className="text-sm text-slate-300">
                      You scored {result.points} out of {result.maxPoints} points.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Show correct answers when wrong */}
            {!result.isCorrect && (
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 217, 181, 0.1)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5" style={{ color: '#00D9B5' }} />
                  <p className="font-semibold text-sm" style={{ color: '#00D9B5' }}>
                    Correct Answer(s):
                  </p>
                </div>
                <div className="space-y-2">
                  {currentQuestion.answers.map((answer, idx) => {
                    if (answer.correct) {
                      return (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00D9B5' }} />
                          <span>{answer.text}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 border-t"
        style={{ 
          backgroundColor: '#2B1B52',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))'
        }}
      >
        <div className="container-mobile py-4">
          {!showFeedback ? (
            <button
              onClick={checkAnswer}
              disabled={!hasAnswer}
              className="btn btn-eurex w-full gap-2"
              style={!hasAnswer ? {
                opacity: 0.5,
                cursor: 'not-allowed',
              } : {}}
            >
              <CheckCircle className="w-5 h-5" />
              Check Answer
            </button>
          ) : (
            <button
              onClick={() => {
                if (isLastQuestion) {
                  resetExam();
                } else {
                  nextQuestion();
                }
              }}
              className="btn btn-eurex w-full gap-2"
            >
              {isLastQuestion ? 'Back to Main Menu' : 'Next Question'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
