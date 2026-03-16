import React from 'react';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';

const Result = ({ score, totalScore, restartQuiz }) => {
  const { t } = useTranslation();
  const isPass = score >= 120;

  // When passing, randomly select one of the two success messages.
  const passMessages = ['passMessage', 'passMessage_alt'];
  const randomMessageKey = passMessages[Math.floor(Math.random() * passMessages.length)];

  return (
    <div className="text-center">
      {isPass && <Confetti />}
      <h2 className="text-3xl font-bold mb-4">{t('resultTitle')}</h2>
      <p className="text-xl mb-6">{t('yourScore', { score, totalScore })}</p>
      
      {isPass ? (
        <div className="p-6 bg-green-100 border-2 border-green-300 rounded-lg">
          <h3 className="text-2xl font-semibold text-green-800">{t('passTitle')}</h3>
          <p className="mt-2 text-green-700">{t(randomMessageKey)}</p>
        </div>
      ) : (
        <div className="p-6 bg-red-100 border-2 border-red-300 rounded-lg shake-animation">
          <h3 className="text-2xl font-semibold text-red-800">{t('failTitle')}</h3>
          <p className="mt-2 text-red-700">{t('failMessage')}</p>
        </div>
      )}

      <button 
        onClick={restartQuiz}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        {t('restartButton')}
      </button>
    </div>
  );
};

export default Result;
