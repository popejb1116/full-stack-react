import React from 'react'
import styled from 'styled-components'

const Footer = () => {
   return (
      <StyledFooter>
         
      </StyledFooter>
   )
}

export default Footer

const StyledFooter = styled.footer`
   grid-area: f;
   background: ${props => props.theme.primary};
`