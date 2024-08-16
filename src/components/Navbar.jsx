import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCube, FaQuestionCircle } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, rgba(35,37,38,1) 0%, rgba(65,67,69,1) 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #e2e2e2;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const IconContainer = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const AppName = styled.div`
  font-size: 2rem;
  color: #61dafb;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

function Navbar() {
  return (
    <Nav>
      <AppName>BettingApp</AppName>
      <NavLink to="/">
        <IconContainer>
          <FaCube />
        </IconContainer>
        Cube & Coin
      </NavLink>
      <NavLink to="/questions">
        <IconContainer>
          <FaQuestionCircle />
        </IconContainer>
        Questions
      </NavLink>
    </Nav>
  );
}

export default Navbar;
