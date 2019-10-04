import styled from 'styled-components'

export const StyledForm = styled.form`
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-around;
   align-items: center;
   height: 75%;
   width: 100%;
`

export const StyledInputSection = styled.section`
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-evenly;
   align-items: center;
   height: 70%;
   width: 100%;
`

export const StyledInput = styled.input`
   background: ${props => props.theme.secondary};
   color: ${props => props.theme.primary};
   height: 3rem;
   width: 40%;
   padding: 6px;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 1.25rem;
   font-weight: 600;
   &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
   }
`

export const StyledButton = styled.button`
   background-color: ${props => props.theme.primary};
   color: ${props => props.theme.secondary};
   height: 4rem;
   width: 30%;
   margin-bottom: 2rem;
   padding: 6px;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 1.5rem;
   font-weight: bold;
   transition: background-color 0.5s, color 0.5s;
   &:hover {
      background-color: ${props => props.theme.secondary};
      color: ${props => props.theme.primary};
   }
   &:focus {
      outline: none;
      border-color: ${props => props.theme.secondary};
   }  
   &:disabled {
      background: grey;
      color: lightgray;
      cursor: not-allowed;
   }
`