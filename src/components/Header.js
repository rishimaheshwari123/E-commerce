import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Nav from './Nav';

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
  .f{
    font-size: 3rem;
    font-weight : bold;
  }
`;

const Header = () => {
  return (
    <MainHeader>
      <Link to="/">
        <span className='navbar-link navbar-lists f'>E-Commerce</span>
      </Link>
      <Nav/>
    </MainHeader>
  )
}

export default Header
