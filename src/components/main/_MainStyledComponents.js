import styled from 'styled-components'

export const StyledMainChild = styled.div`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
   height: 100%;
   width: 100%;
`

export const StyledMessageCenter = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
   min-height: 20vh;
   width: 100%;
   color: ${props => props.theme.accent};
   font-size: 1.5rem;
   animation: reveal-message 0.5s forwards;
   @keyframes reveal-message {
      0% {
         transform: translateY(6vh);
         opacity: 0;
      }
      20% {
         transform: translateY(2vh);
         opacity: 0.3;
      }
      100% {
         transform: translateY(0);
         opacity: 1;
      }      
   }

   @media (max-width: 1024px) {
      min-height: 12vh;
   }

   @media (max-width: 740px) {
      font-size: 1rem;
   }

   @media (max-width: 414px) {
      min-height: 8vh;
      padding-top: 0.5rem;
      font-size: 1rem;
   }   
`