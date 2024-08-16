import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CubePage from './components/CubePage';
import QuestionPage from './components/QuestionPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<CubePage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;