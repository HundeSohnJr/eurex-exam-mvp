import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { useExamStore } from '../store/examStore';

export function ExamFooter() {
  const { currentQuestionIndex, questions, nextQuestion, previousQuestion, finishExam } = useExamStore();
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{ 
        backgroundColor: '#2B1B52',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))'
      }}
    >
      <div className="container-mobile py-4">
        <div className="flex gap-3">
          {/* Previous Button */}
          <button
            onClick={previousQuestion}
            disabled={isFirstQuestion}
            className="btn flex-1"
            style={{
              backgroundColor: isFirstQuestion ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.5)',
              color: isFirstQuestion ? 'rgb(148, 163, 184)' : 'rgb(241, 245, 249)',
              cursor: isFirstQuestion ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {/* Next or Finish Button */}
          {isLastQuestion ? (
            <button
              onClick={finishExam}
              className="btn btn-eurex flex-[2] gap-2"
            >
              <Flag className="w-5 h-5" />
              Finish Exam
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="btn btn-eurex flex-[2] gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
