import { useExamStore } from './store/examStore';
import { StartScreen } from './components/StartScreen';
import { ExamView } from './components/ExamView';
import { ExerciseView } from './components/ExerciseView';
import { ResultView } from './components/ResultView';

function App() {
  const { isStarted, isFinished, isExerciseMode, questions } = useExamStore();

  console.log('App State:', { isStarted, isFinished, isExerciseMode, questionCount: questions.length });

  // Show appropriate view based on exam state
  if (!isStarted) {
    return <StartScreen />;
  }

  if (isFinished) {
    return <ResultView />;
  }

  // Exercise Mode or Exam Mode
  if (isExerciseMode) {
    return <ExerciseView />;
  }

  return <ExamView />;
}

export default App;
