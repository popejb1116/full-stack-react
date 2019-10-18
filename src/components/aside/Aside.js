import React from 'react'
import styled from 'styled-components'
import Toggle from './Toggle'

const Aside = () => {
   return (
      <StyledAside>
         <Toggle/>
         <Toggle/>
      </StyledAside>
   )
}

export default Aside

const StyledAside = styled.aside`
   grid-area: a;
   background: ${props => props.theme.secondary};
   margin: 1vh 0;
   border-top-left-radius: 6px;
   border-bottom-left-radius: 6px;

   height: 73vh;

   @media (max-width: 1024px) {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      height: 14vh;
      margin: 1vh 0 0 0;
      border-radius: 6px;   
   }
`