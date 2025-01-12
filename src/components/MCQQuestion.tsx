import { useState } from "react";
import { MCQ } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface MCQQuestionProps {
  mcq: MCQ;
}

export const MCQQuestion = ({ mcq }: MCQQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) {
      return;
    }

    const correct = mcq.options.find((opt) => opt.id === selectedOption)?.isCorrect;
    setIsCorrect(!!correct);
    setIsSubmitted(true);
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto animate-fade-in bg-white/80 backdrop-blur-sm border border-gray-100">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">{mcq.question}</h3>

        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {mcq.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
                isSubmitted && option.isCorrect
                  ? "bg-green-50/80 border-green-200"
                  : isSubmitted && option.id === selectedOption && !option.isCorrect
                  ? "bg-red-50/80 border-red-200"
                  : "hover:bg-gray-50/80 border-gray-200"
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
            isCorrect ? "bg-green-50/80 text-green-700" : "bg-red-50/80 text-red-700"
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
              <div className="p-4 bg-gray-50/80 rounded-lg">
                <p className="font-semibold text-gray-800">Topic: {mcq.topic}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Source: {mcq.sourceStatement}
                </p>
              </div>
              <div className="p-4 bg-blue-50/80 rounded-lg">
                <p className="font-semibold text-blue-900">Explanation:</p>
                <p className="text-sm text-blue-800 mt-1">{mcq.explanation}</p>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitted || !selectedOption}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};