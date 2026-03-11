import React from 'react';
import Quiz from './components/Quiz';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <>
      <LanguageSwitcher />
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-200">
        <Quiz />
      </div>
    </>
  );
}

export default App;

