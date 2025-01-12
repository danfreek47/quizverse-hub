import { useState } from "react";
import { MCQ } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MCQQuestionProps {
  mcq: MCQ;
}

export const MCQQuestion = ({ mcq }: MCQQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = mcq.options.find((opt) => opt.id === selectedOption)
      ?.isCorrect;
    setIsSubmitted(true);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect
        ? "Great job!"
        : "Try reviewing the explanation below.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mb-8 animate-fade-in">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{mcq.question}</h3>

        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-4"
        >
          {mcq.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 p-4 rounded-lg border ${
                isSubmitted && option.isCorrect
                  ? "bg-green-50 border-green-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-4">
          {isSubmitted && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Topic: {mcq.topic}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Source: {mcq.sourceStatement}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900">Explanation:</p>
                <p className="text-sm text-blue-800 mt-1">{mcq.explanation}</p>
              </div>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};