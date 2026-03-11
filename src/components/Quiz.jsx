import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { quizData } from '../quizData';
import Question from './Question';
import Result from './Result';

const Quiz = () => {
  const { t, i18n } = useTranslation();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const audioRef = useRef(null);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed: ", e));
    }
  };

  const handleAnswerOptionClick = (isCorrect, index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (!quizStarted) {
    return (
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800 title-float">{t('quizTitle')}</h1>
        <p className="text-2xl mb-8 text-gray-600">{t('quizSubtitle')}</p>
        <button 
          onClick={handleStartQuiz}
          className="px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 text-xl"
        >
          {t('startButton')}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/02/01/audio_c28f66813a.mp3" loop volume="0.2"></audio>
      {showResult ? (
        <Result score={score} totalScore={quizData.length * 10} restartQuiz={restartQuiz} />
      ) : (
        <Question 
          question={quizData[currentQuestion].question[i18n.language]}
          options={quizData[currentQuestion].options[i18n.language]}
          answer={quizData[currentQuestion].answer}
          handleAnswerOptionClick={handleAnswerOptionClick}
          showFeedback={showFeedback}
          selectedAnswer={selectedAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
