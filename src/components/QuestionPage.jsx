import React, { useEffect } from 'react';
import styled from 'styled-components';
import Question from './Question';
import { useTimer } from '../context/TimerContext';
import { useSelection } from '../context/SelectionContext';

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #f9f9f9;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #282c34;
  margin-bottom: 2rem;
`;

const QuestionsPage = () => {
  const { timeLeft } = useTimer();
  const { selectedOptions, resetSelections } = useSelection();

  // Array of questions and options
  const questions = [
    { question: 'What will be the cube number?', options: ['1', '2', '3', '4', '5', '6'] },
    { question: 'What will be the coin flip?', options: ['Heads', 'Tails'] },
    { question: 'Will it rain today?', options: ['Yes', 'No'] },
    { question: 'Will the stock price go up?', options: ['Yes', 'No'] },
  ];

  useEffect(() => {
    if (timeLeft === 0) {
      resetSelections(); // Reset all selections after spin
    }
  }, [timeLeft, resetSelections]);

  return (
    <QuestionsContainer>
      <Heading>Place Your Bets!</Heading>
      {questions.map((q, index) => (
        <Question
          key={index}
          index={index}
          question={q.question}
          options={q.options}
          canPlaceBet={selectedOptions[index] !== null} // Pass a prop indicating if a selection exists
          resetOptions={timeLeft === 0}
        />
      ))}
    </QuestionsContainer>
  );
};

export default QuestionsPage;