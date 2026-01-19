import { PlayCircle, BookOpen, Clock, Target, GraduationCap } from 'lucide-react';
import { useExamStore } from '../store/examStore';
import examData from '../data/questions.json';

export function StartScreen() {
  const { startExam, startExercise } = useExamStore();
  const { exam_info } = examData;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container-mobile max-w-md">
        <div className="card p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" 
                 style={{ backgroundColor: '#00D9B5' }}>
              <BookOpen className="w-10 h-10" style={{ color: '#2B1B52' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Eurex Trader Exam</h1>
            <p className="text-slate-300 text-sm">
              Version {exam_info.version} • {exam_info.date}
            </p>
          </div>

          {/* Exam Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'rgba(0, 217, 181, 0.1)' }}>
              <Target className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00D9B5' }} />
              <div>
                <p className="font-semibold text-sm">35 Questions</p>
                <p className="text-slate-300 text-xs">
                  15 from Chapter 1 + 20 from Chapter 2
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'rgba(0, 217, 181, 0.1)' }}>
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00D9B5' }} />
              <div>
                <p className="font-semibold text-sm">{exam_info.duration_minutes} Minutes</p>
                <p className="text-slate-300 text-xs">
                  Exam Duration
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'rgba(0, 217, 181, 0.1)' }}>
              <Target className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00D9B5' }} />
              <div>
                <p className="font-semibold text-sm">{exam_info.pass_percentage}% to Pass</p>
                <p className="text-slate-300 text-xs">
                  Minimum Score Required
                </p>
              </div>
            </div>
          </div>

          {/* Question Types */}
          <div className="mb-8 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold mb-3 text-sm">Question Types:</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>• <span className="font-medium text-slate-100">True/False:</span> 2 Points</p>
              <p>• <span className="font-medium text-slate-100">Single Choice:</span> 2 Points</p>
              <p>• <span className="font-medium text-slate-100">Multiple Choice:</span> 0-4 Points</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={startExam}
              className="btn btn-eurex w-full text-lg gap-2"
            >
              <PlayCircle className="w-6 h-6" />
              Start Exam
            </button>
            
            <button
              onClick={startExercise}
              className="btn w-full text-lg gap-2"
              style={{
                backgroundColor: 'rgba(100, 116, 139, 0.5)',
                color: 'rgb(241, 245, 249)',
              }}
            >
              <GraduationCap className="w-6 h-6" />
              Practice Mode
            </button>
            
            <p className="text-xs text-slate-400 text-center mt-2">
              In Practice Mode, you'll see the correct answers immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
