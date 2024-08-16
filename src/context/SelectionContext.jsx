import React, { createContext, useState, useContext } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const updateSelection = (questionIndex, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const resetSelections = () => {
    setSelectedOptions({});
  };

  return (
    <SelectionContext.Provider value={{ selectedOptions, updateSelection, resetSelections }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
