import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  max-width: 600px;
  position: relative; /* Needed for modal positioning */
`;

const QuestionTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Keep options vertical */
  justify-content: space-between; /* Distribute options evenly */
  margin-bottom: 1rem;
`;

const PlaceBetButton = styled.button`
  background-color: #3f51b5; /* Adjust color as needed */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Increase padding for a bigger button */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #283776;
  }
`;

const OptionButton = styled.button`
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#f0f0f0')};
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* Ensure modal appears above other elements */
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Add space between form elements */
`;

const ModalInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const ModalButton = styled.button`
  background-color: #3f51b5; /* Adjust color as needed */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Increase padding for a bigger button */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #283776;
  }
`;

const Question = ({ question, options, index, canPlaceBet, resetOptions }) => {
  const { selectedOptions, updateSelection } = useSelection();
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [showPlaceBetModal, setShowPlaceBetModal] = useState(false); // State for modal visibility
  const [betAmount, setBetAmount] = useState('');
  const [playerName, setPlayerName] = useState('');
  const selectedOption = selectedOptions[index];

  useEffect(() => {
    if (resetOptions) {
      updateSelection(index, null); // Reset selection when spin happens
      setErrorMessage(null); // Clear error message on reset
      setShowPlaceBetModal(false); // Close modal
      setBetAmount('');
      setPlayerName('');
    }
  }, [resetOptions, index, updateSelection]);

  const handlePlaceBet = () => {
    if (!canPlaceBet) {
      setErrorMessage('Please select an option before placing your bet!');
    } else {
      setShowPlaceBetModal(true);
    }
  };

  const handleConfirmBet = () => {
    // Implement your bet confirmation logic here
    // You might send the bet data to a server or perform other actions

    // Close the modal
    setShowPlaceBetModal(false);

    // Reset form fields
    setBetAmount('');
    setPlayerName('');
  };

  const handleCancelBet = () => {
    // Close the modal without confirming the bet
    setShowPlaceBetModal(false);
  };

  return (
    <QuestionContainer>
      <QuestionTitle>{question}</QuestionTitle>
      <OptionsContainer>
        {options.map((option, optIndex) => (
          <OptionButton
            key={optIndex}
            selected={selectedOption === optIndex}
            onClick={() => updateSelection(index, optIndex)}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <PlaceBetButton disabled={!canPlaceBet} onClick={handlePlaceBet}>
        Place Bet
      </PlaceBetButton>

      {showPlaceBetModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Place Your Bet</h2>
            <ModalInput
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <ModalInput
              type="number"
              placeholder="Enter bet amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <ModalButton onClick={handleConfirmBet}>Confirm</ModalButton>
            <ModalButton onClick={handleCancelBet}>Cancel</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </QuestionContainer>
  );
};

export default Question;