import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  History as HistoryIcon,
  Calendar,
  Trophy,
  ArrowUpRight,
  ChevronLeft,
  BarChart3,
  Clock,
  Trash2
} from "lucide-react";
import { getQuizHistory } from "@/lib/indexedDB";
import { quizQuestions } from "@/lib/quiz-data";

const History = () => {
  const [history, setHistory] = useState<{ score: number; date: string }[]>([]);
  const [showStats, setShowStats] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getQuizHistory();
    setHistory(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const calculateStats = () => {
    if (history.length === 0) return null;

    const scores = history.map(h => h.score);
    return {
      averageScore: (scores.reduce((a, b) => a + b, 0) / history.length).toFixed(1),
      highestScore: Math.max(...scores),
      totalAttempts: history.length,
      recentScore: history[0]?.score || 0,
      improvement: history.length > 1 ? 
        ((history[0].score - history[history.length - 1].score) / history[history.length - 1].score * 100).toFixed(1) : 0
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:text-gray-300"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <HistoryIcon className="w-6 h-6" />
              Quiz History
            </h2>
          </div>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
        </div>

        {/* Stats Section */}
        {showStats && stats && (
          <Card className="p-6 mb-8 bg-black border-gray-800">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <Trophy className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{stats.averageScore}</p>
                <Progress value={(Number(stats.averageScore) / quizQuestions.length) * 100} className="mt-2" />
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Highest Score</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{stats.highestScore}</p>
                <Progress value={(stats.highestScore / quizQuestions.length) * 100} className="mt-2" />
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Attempts</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-bold">{stats.totalAttempts}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Improvement: {stats.improvement}%
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* History List */}
        <div className="space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((attempt, index) => (
                <Card key={index} className="p-4 bg-black border-gray-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Trophy className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="font-semibold">Score: {attempt.score} / {quizQuestions.length}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(attempt.date).toLocaleDateString()} at{" "}
                          {new Date(attempt.date).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={(attempt.score / quizQuestions.length) * 100}
                      className="w-24"
                    />
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <Card className="p-8 text-center bg-black">
              <HistoryIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-semibold mb-2">No Quiz History</p>
              <p className="text-gray-600 mb-6">Take your first quiz to start tracking your progress!</p>
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => navigate("/quiz")}
              >
                Start Quiz
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;