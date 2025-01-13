import { useState } from "react";
import { MCQ } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, BookOpen, GraduationCap } from "lucide-react";

interface MCQQuestionProps {
  mcq: MCQ;
}

export const MCQQuestion = ({ mcq }: MCQQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    const correct = mcq.options.find((opt) => opt.id === selectedOption)?.isCorrect;
    setIsCorrect(!!correct);
    setIsSubmitted(true);
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto animate-fade-in glass-card hover:shadow-2xl hover:shadow-accent/5">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white/90 leading-relaxed">
              {mcq.question}
            </h3>
          </div>
        </div>

        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {mcq.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 hover:translate-x-1 ${
                isSubmitted && option.isCorrect
                  ? "bg-green-900/20 border-green-500/30 text-green-300"
                  : isSubmitted && option.id === selectedOption && !option.isCorrect
                  ? "bg-red-900/20 border-red-500/30 text-red-300"
                  : "hover:bg-white/5 border-white/10 text-white/80"
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {isSubmitted && (
          <div className={`flex items-center gap-2 p-4 rounded-lg ${
            isCorrect 
              ? "bg-green-900/20 text-green-300 border border-green-500/30" 
              : "bg-red-900/20 text-red-300 border border-red-500/30"
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-medium">
              {isCorrect ? "Correct answer!" : "Incorrect answer"}
            </span>
          </div>
        )}

        <div className="space-y-4">
          {isSubmitted && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/30 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <p className="font-semibold text-white/90">Topic: {mcq.topic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <p className="text-sm text-white/70">
                    Source: {mcq.sourceStatement}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg border border-white/10">
                <p className="font-semibold text-white/90 mb-2">Explanation:</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  {mcq.explanation}
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitted || !selectedOption}
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            Submit Answer
          </Button>
        </div>
      </div>
    </Card>
  );
};