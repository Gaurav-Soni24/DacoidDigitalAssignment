import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Trophy, Home, History, RotateCcw, Share2, Award, Timer} from "lucide-react";
import { quizQuestions } from "@/lib/quiz-data";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, date } = location.state || { score: 0, date: new Date().toISOString() };
  
  const percentage = (score / quizQuestions.length) * 100;
  const timeSpent = quizQuestions.reduce((acc, q) => acc + q.timeLimit, 0);
  
  const getFeedback = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance! You've mastered this topic!";
    if (percentage >= 70) return "Great job! You have a solid understanding!";
    if (percentage >= 50) return "Good effort! Keep practicing to improve!";
    return "Keep learning! Practice makes perfect!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="p-8 max-w-2xl w-full bg-black border border-gray-800 shadow-2xl rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-12 h-12 text-white" />
        </div>

        {/* Title and Score */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">{getFeedback(percentage)}</p>
          
          <div className="relative mb-8">
            <Progress 
              value={percentage} 
              className="h-4 bg-gray-200"
            />
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 font-mono font-bold text-xl">
              {score} / {quizQuestions.length}
            </span>
            <br />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Score Percentage</p>
            <p className="text-xl font-bold">{percentage.toFixed(1)}%</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <Timer className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Time Spent</p>
            <p className="text-xl font-bold">{timeSpent} seconds</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button 
            className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => navigate("/history")}
          >
            <History className="w-4 h-4" />
            History
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => navigate("/quiz")}
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button 
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => {
              // Implement share functionality
              navigator.clipboard.writeText(`I scored ${score}/${quizQuestions.length} on the quiz!`);
            }}
          >
            <Share2 className="w-4 h-4" />
            Share Score
          </Button>
        </div>

        {/* Timestamp */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Completed on {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}
        </p>
      </Card>
    </div>
  );
};

export default Results;