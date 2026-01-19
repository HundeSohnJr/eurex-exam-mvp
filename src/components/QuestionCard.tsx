import { CheckCircle2, Circle } from 'lucide-react';
import type { Question } from '../types/exam';
import { useExamStore } from '../store/examStore';
import { cn } from '../utils/cn';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const selectedAnswers = useExamStore((state) => state.selectedAnswers[question.id]);
  const toggleAnswer = useExamStore((state) => state.toggleAnswer);

  const isSelected = (index: number) => selectedAnswers?.includes(index) ?? false;

  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case 'true_false':
        return 'True/False (2 Points)';
      case 'single_choice':
        return 'Single Choice (2 Points)';
      case 'multiple_choice':
        return 'Multiple Choice (0-4 Points)';
      default:
        return '';
    }
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full" 
                style={{ backgroundColor: 'rgba(0, 217, 181, 0.2)', color: '#00D9B5' }}>
            {question.chapter}
          </span>
          <span className="text-sm text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="text-xs text-slate-400 mb-4">
          {getQuestionTypeLabel()}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-lg font-semibold mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Optional Table */}
      {question.table && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            {question.table.headers && (
              <thead>
                <tr style={{ backgroundColor: 'rgba(0, 217, 181, 0.1)' }}>
                  {question.table.headers.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-3 py-2 text-left font-semibold border border-slate-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {question.table.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-3 py-2 border border-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {question.table.note && (
            <p className="text-xs text-slate-400 mt-2 italic">
              {question.table.note}
            </p>
          )}
        </div>
      )}

      {/* Answers */}
      <div className="space-y-3">
        {question.answers.map((answer, index) => {
          const selected = isSelected(index);
          
          return (
            <button
              key={index}
              onClick={() => toggleAnswer(question.id, index)}
              className={cn(
                'w-full min-h-[56px] p-4 rounded-lg border-2 transition-all text-left',
                'flex items-center gap-3',
                selected
                  ? 'border-[#00D9B5] font-bold'
                  : 'border-slate-600 hover:border-slate-500'
              )}
              style={
                selected
                  ? { backgroundColor: '#00D9B5', color: '#2B1B52' }
                  : { backgroundColor: 'rgba(100, 116, 139, 0.2)' }
              }
            >
              {selected ? (
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 flex-shrink-0 text-slate-400" />
              )}
              <span className="flex-1 leading-relaxed">
                {answer.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint for Multiple Choice */}
      {question.type === 'multiple_choice' && (
        <p className="mt-4 text-xs text-slate-400 text-center">
          💡 Multiple answers can be correct
        </p>
      )}
    </div>
  );
}
