import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Timer, Brain, ArrowRight, AlertCircle } from "lucide-react";
import { quizQuestions } from "@/lib/quiz-data";
import { saveQuizAttempt } from "@/lib/indexedDB";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizQuestions[currentQuestion].timeLimit);
  const [integerAnswer, setIntegerAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (answer: string | number) => {
    const currentQ = quizQuestions[currentQuestion];

    let isCorrect = false;
    if (currentQ.type === "multiple-choice") {
      isCorrect = answer === currentQ.correctAnswer;
    } else if (currentQ.type === "integer") {
      isCorrect = Number(answer) === currentQ.correctAnswer;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers([...answers, answer]);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(quizQuestions[currentQuestion + 1].timeLimit);
      setIntegerAnswer("");
      setShowHint(false);
    } else {
      const quizAttempt = { answers, score, date: new Date().toISOString() };
      saveQuizAttempt(quizAttempt);
      navigate("/results", { state: quizAttempt });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="p-8 max-w-2xl w-full bg-black border border-gray-800 shadow-2xl rounded-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <h1 className="text-xl font-bold">Quiz Challenge</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-mono">
              Question {currentQuestion + 1}/{quizQuestions.length}
            </Badge>
            <Badge variant="outline" className="font-mono">
              Score: {score}
            </Badge>
          </div>
        </div>

        {/* Timer Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4" />
            <span className="text-sm font-medium">Time Remaining: {timeLeft}s</span>
          </div>
          <Progress 
            value={(timeLeft / quizQuestions[currentQuestion].timeLimit) * 100} 
            className="h-2 bg-gray-200"
          />
        </div>

        <Separator className="my-6" />

        {/* Question Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              {currentQuestion + 1}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {quizQuestions[currentQuestion].question}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {"Select the best answer from the options below"}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="space-y-4">
          {quizQuestions[currentQuestion].type === "multiple-choice" ? (
            <div className="grid gap-3">
              {quizQuestions[currentQuestion].options?.map((option, index) => (
                <Button
                  key={index}
                  className="w-full py-6 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-between group"
                  onClick={() => handleAnswer(String.fromCharCode(65 + index))}
                >
                  <span className="text-lg">{option}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="number"
                value={integerAnswer}
                onChange={(e) => setIntegerAnswer(e.target.value)}
                placeholder="Enter your numerical answer"
                className="text-lg py-6 border-2 border-black focus:ring-black focus:border-black"
              />
              <Button 
                className="w-full py-6 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => handleAnswer(Number(integerAnswer))}
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Hint Section */}
        <div className="mt-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
            onClick={() => setShowHint(!showHint)}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Need a hint?</span>
          </Button>
          {showHint && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                {"Focus on the key elements of the question and consider all options carefully."}
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <Separator className="my-6" />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Time per question: {quizQuestions[currentQuestion].timeLimit}s</span>
          <span>Difficulty: {"Medium"}</span>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;