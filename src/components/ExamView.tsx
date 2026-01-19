import { Home, Clock } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { ExamFooter } from './ExamFooter';
import { useExamStore } from '../store/examStore';
import { useTimer } from '../hooks/useTimer';
import examData from '../data/questions.json';

export function ExamView() {
  const { questions, currentQuestionIndex, startTime, resetExam } = useExamStore();
  const { formattedTime, isWarning } = useTimer(startTime, examData.exam_info.duration_minutes);
  
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400">No question found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="container-mobile py-6">
        {/* Header with Timer and Abort */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: isWarning ? '#ef4444' : '#00D9B5' }} />
            <span 
              className="text-lg font-bold"
              style={{ color: isWarning ? '#ef4444' : '#00D9B5' }}
            >
              {formattedTime}
            </span>
          </div>
          <button
            onClick={resetExam}
            className="btn gap-2"
            style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              color: '#ef4444',
              minHeight: '40px',
              padding: '0 1rem',
            }}
          >
            <Home className="w-4 h-4" />
            Abort Exam
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">
              Progress
            </span>
            <span className="text-sm font-semibold" style={{ color: '#00D9B5' }}>
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                backgroundColor: '#00D9B5',
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>

      {/* Footer Navigation */}
      <ExamFooter />
    </div>
  );
}
