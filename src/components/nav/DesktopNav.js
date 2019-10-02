import React from 'react'
import styled from 'styled-components'
import Navlinks from './Navlinks'

const DesktopNav = () => {
   return (
      <StyledDesktopNav>
         <Navlinks/>
      </StyledDesktopNav>
   )
}

export default DesktopNav

const StyledDesktopNav = styled.nav`
   height: 100%;
   width: 45%;

   ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
      list-style: none;
   }

   li {
      height: 100%;
   }

   a {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: ${props => props.theme.secondary};
      padding: 6px;
      border-radius: 6px;
      font-size: 2rem;
      font-weight: 600;
      text-decoration: none;
   }
   a:focus {
      outline: none;
      background: rgba(0,0,0,0.1);
   }
   a::after {
      content: '';
      height: 3px;
      width: 3px;
      background: ${props => props.theme.accent};
      transform: translateY(2vh);
      opacity: 0;
      transition: transform 0.25s, width 0.25s 0.25s, opacity 0.15s;
   }
   a:hover::after {
      transform: translateY(-6px);
      width: 100%;
      opacity: 1;
   }
`
