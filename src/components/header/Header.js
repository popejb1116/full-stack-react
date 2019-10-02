import React from 'react'
import styled from 'styled-components'
import DesktopNav from '../nav/DesktopNav'

const Header = () => {
   return (
      <StyledHeader>
         <DesktopNav/>
         <StyledProfile>ME</StyledProfile>
      </StyledHeader>
   )
}

export default Header

const StyledHeader = styled.header`
   grid-area: h;
   display: flex;
   justify-content: space-around;
   align-items: center;
   background: ${props => props.theme.primary};
`

const StyledProfile = styled.button`
   height: 8vh;
   width: 8vh;
   background: ${props => props.theme.accent};
   color: ${props => props.theme.secondary};
   border: none;
   border-radius: 50%;
   font-size: 1.5rem;
   font-weight: 500;
`