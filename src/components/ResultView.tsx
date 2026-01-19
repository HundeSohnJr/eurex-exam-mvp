import { Trophy, XCircle, CheckCircle2, RotateCcw, Home } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import { calculateScore } from '../utils/scoring';

export function ResultView() {
  const { questions, selectedAnswers, score, maxScore, passed, resetExam } = useExamStore();
  
  const percentage = maxScore ? Math.round((score! / maxScore) * 100) : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container-mobile max-w-2xl">
        {/* Result Header */}
        <div className="card p-8 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
               style={{ 
                 backgroundColor: passed ? 'rgba(0, 217, 181, 0.2)' : 'rgba(220, 38, 38, 0.2)'
               }}>
            {passed ? (
              <Trophy className="w-12 h-12" style={{ color: '#00D9B5' }} />
            ) : (
              <XCircle className="w-12 h-12 text-red-500" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">
            {passed ? 'Passed!' : 'Not Passed'}
          </h1>
          
          <p className="text-slate-300 mb-6">
            {passed 
              ? 'Congratulations! You have passed the exam.'
              : 'Unfortunately, you did not reach the minimum score.'}
          </p>

          {/* Score Ring */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" 
                   style={{ color: passed ? '#00D9B5' : '#ef4444' }}>
                {percentage}%
              </div>
              <p className="text-sm text-slate-400">Score</p>
            </div>
            <div className="h-16 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {score} / {maxScore}
              </div>
              <p className="text-sm text-slate-400">Points</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetExam}
              className="btn flex-1 gap-2"
              style={{
                backgroundColor: 'rgba(100, 116, 139, 0.5)',
                color: 'rgb(241, 245, 249)',
              }}
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
            <button
              onClick={resetExam}
              className="btn btn-eurex flex-1 gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Detailed Results</h2>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswers = selectedAnswers[question.id] || [];
              const result = calculateScore(question, userAnswers);
              const isCorrect = result.isCorrect;

              return (
                <div
                  key={question.id}
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderColor: isCorrect ? '#00D9B5' : '#ef4444',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" 
                                   style={{ color: '#00D9B5' }} />
                    ) : (
                      <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <p className="font-semibold text-sm">
                          Question {index + 1}: {question.question.substring(0, 60)}...
                        </p>
                        <span className="text-sm font-medium whitespace-nowrap"
                              style={{ color: isCorrect ? '#00D9B5' : '#ef4444' }}>
                          {result.points}/{result.maxPoints} pts
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-400 space-y-1">
                        <p>
                          <span className="font-medium">Type:</span> {question.type === 'multiple_choice' ? 'Multiple Choice' : question.type === 'single_choice' ? 'Single Choice' : 'True/False'}
                        </p>
                        
                        {!isCorrect && (
                          <div className="mt-2">
                            <p className="font-medium text-slate-300 mb-1">Correct Answer(s):</p>
                            {question.answers.map((answer, idx) => {
                              if (answer.correct) {
                                return (
                                  <p key={idx} className="text-green-400">
                                    ✓ {answer.text}
                                  </p>
                                );
                              }
                              return null;
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
