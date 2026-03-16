import React, { useState, useEffect, useMemo } from 'react';
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
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (options && options.length > 0) {
      const optionsWithOriginalIndex = options.map((option, index) => ({
        text: option,
        originalIndex: index
      }));

      // Fisher-Yates shuffle algorithm
      for (let i = optionsWithOriginalIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithOriginalIndex[i], optionsWithOriginalIndex[j]] = [optionsWithOriginalIndex[j], optionsWithOriginalIndex[i]];
      }
      
      setShuffledOptions(optionsWithOriginalIndex);
    }
  }, [options]);

  const getButtonClass = (optionOriginalIndex) => {
    if (!showFeedback) {
      return "hover:text-blue-600"; // Subtle hover effect on text
    }
    if (optionOriginalIndex === answer) {
      return "text-green-600 font-bold"; // Correct answer text turns green and bold
    }
    if (optionOriginalIndex === selectedAnswer) {
      return "text-red-600 line-through"; // Incorrect user choice text turns red and gets a line-through
    }
    return "text-gray-500"; // Other options fade out
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
        <h2 className="text-4xl font-semibold text-gray-800">{question}</h2>
      </div>
      <div className="flex flex-col space-y-4">
        {shuffledOptions.map((option) => (
          <button 
            key={option.originalIndex} 
            onClick={() => handleAnswerOptionClick(option.originalIndex === answer, option.originalIndex)}
            disabled={showFeedback}
            className={`w-full text-left p-2 rounded-lg transition-colors duration-200 ease-in-out flex justify-between items-center text-xl ${getButtonClass(option.originalIndex)}`}
          >
            <span>{option.text}</span>
            <div className="flex items-center">
              {showFeedback && option.originalIndex === selectedAnswer && !isCorrect && <span className="font-bold text-red-800 mr-2">❌</span>}
              {showFeedback && option.originalIndex === answer && <span className="font-bold text-green-800">{t('correctMark')}</span>}
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
