import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const correctFeedback = [
  "correctFeedback1",
  "correctFeedback2",
  "correctFeedback3"
];

const incorrectFeedback = [
  "incorrectFeedback1",
  "incorrectFeedback2",
  "incorrectFeedback3"
];

const Question = ({ question, options, answer, handleAnswerOptionClick, showFeedback, selectedAnswer, handleNextQuestion }) => {
  const { t } = useTranslation();

  const getButtonClass = (index) => {
    if (!showFeedback) {
      return "bg-gray-100 hover:bg-blue-100";
    }
    if (index === answer) {
      return "bg-green-300 border-green-500"; // Correct answer
    }
    if (index === selectedAnswer) {
      return "bg-red-300 border-red-500"; // Incorrect user choice
    }
    return "bg-gray-100"; // Other incorrect options
  };

  const isCorrect = selectedAnswer === answer;

  const feedbackText = useMemo(() => {
    if (!showFeedback) return "";
    const feedbackArray = isCorrect ? correctFeedback : incorrectFeedback;
    const randomKey = feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
    return t(randomKey);
  }, [showFeedback, isCorrect, t]);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{question}</h2>
      </div>
      <div className="flex flex-col space-y-4">
        {options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswerOptionClick(index === answer, index)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out flex justify-between items-center ${getButtonClass(index)}`}
          >
            <span>{option}</span>
            <div className="flex items-center">
              {showFeedback && index === selectedAnswer && !isCorrect && <span className="font-bold text-red-800 mr-2">❌</span>}
              {showFeedback && index === answer && <span className="font-bold text-green-800">{t('correctMark')}</span>}
            </div>
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-6 text-center">
          <p className={`font-semibold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {feedbackText}
          </p>
          <button 
            onClick={handleNextQuestion}
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {t('nextButton')}
          </button>
        </div>
      )}
    </>
  );
};

export default Question;
