import React, {useState} from 'react'
import styled from 'styled-components'

const Toggle = () => {

   const [defaultSelected, setDefaultSelected] = useState(true)

   return (
      <StyledToggle>
         <StyledTitle>Order By</StyledTitle>
         <StyledSliderSection>
            <StyledOptionButton
               isDefault={true}
               defaultSelected={defaultSelected}
               onClick={() => setDefaultSelected(true)}
               onMouseDown={e => e.preventDefault()}
            >Oldest</StyledOptionButton>
            <StyledSlider defaultSelected={defaultSelected}/>
            <StyledOptionButton
               isDefault={false}
               defaultSelected={defaultSelected}
               onClick={() => setDefaultSelected(false)}
               onMouseDown={e => e.preventDefault()}
            >Newest</StyledOptionButton>
         </StyledSliderSection>
      </StyledToggle>
   )
}

export default Toggle

const StyledToggle = styled.div`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
   height: 50%;
   width: 100%;

   @media (max-width: 1024px) {
      height: 100%;
      width: 50%;
   }

   @media (max-width: 846px) {
      flex-direction: row;
      justify-content: space-around;
      height: 100%;
   }

   @media (max-width: 414px) {
      flex-direction: column;
   }
`

const StyledTitle = styled.p`
   color: ${props => props.theme.primary};
   font-size: 2rem;
   font-weight: bolder;

   @media (max-width: 846px) {
      font-size: 1.25rem;
   }

   @media (max-width: 768px) {
      font-size: 1.5rem;
   }

   @media (max-width: 740px) {
      font-size: 1rem;
   }

   @media (max-width: 731px) {
      font-size: 1.25rem;
   }

   @media (max-width: 568px) {
      font-size: 1rem;
   }

   @media (max-width: 414px) {
      font-size: 1.25rem;
   }
`

const StyledSliderSection = styled.section`
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-between;
   align-items: center;
   height: 20vh;
   width: 100%;

   @media (max-width: 1024px) {
      flex-direction: row;
      justify-content: space-around;
      height: 60%;
      width: 100%;
   }

   @media (max-width: 846px) {
      justify-content: space-around;
      height: 100%;
      width: 60%;
   }

   @media (max-width: 414px) {
      height: 60%;
      width: 100%;
   }
`

const StyledOptionButton = styled.button`
   height: 6vh;
   width: 40%;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 1.25rem;
   font-weight: bold;
   text-transform: uppercase;

   background-color: ${props =>  
      (props.isDefault && props.defaultSelected) ||
      (!props.isDefault && !props.defaultSelected) ? 
      (props.theme.primary) : ('transparent')}
   ;
   color: ${props =>  
      (props.isDefault && props.defaultSelected) ||
      (!props.isDefault && !props.defaultSelected) ? 
      (props.theme.secondary) : (props.theme.primary)}
   ;
   transition: background-color 0.25s 0.25s, color 0.25s 0.25s, border-color 0.5s;

   &:hover {
      border-color: ${props => props.theme.primary};
   }

   &:focus {
      outline: none;
      text-decoration: underline;
   }

   @media (max-width: 1024px) {
      transition: background-color 0.25s, color 0.25s, border-color 0.25s;
      width: 30%;
   }

   @media (max-width: 846px) {
      height: 60%;
      width: 40%;
      font-size: 0.75rem;
   }

   @media (max-width: 768px) {
      height: 50%;
      width: 45%;
      font-size: 1rem;
   }

   @media (max-width: 740px) {
      height: 65%;
      width: 40%;
      font-size: 0.75rem;
   }

   @media (max-width: 568px) {
      font-size: 0.5rem;
   }

   @media (max-width: 414px) {
      font-size: 0.75rem;
   }

   @media (max-width: 320px) {
      height: 75%;
   }
`

const StyledSlider = styled.div`
   height: 4vh;
   width: 4vh;
   background-color: ${props => props.theme.primary};
   border-radius: 50%;
   animation-name: ${props => props.defaultSelected ? ('slideToDefault') : ('slideToAlt')};
   animation-duration: 0.5s;
   animation-fill-mode: forwards;
   @keyframes slideToDefault {
      0% {
         height: 4vh;
         width: 4vh;
         transform: translateY(4vh)
      }
      25% {
         height: 2vh;
         width: 2vh;
         transform: translateY(4vh)
      }
      75% {
         height: 2vh;
         width: 2vh;
         transform: translateY(-4vh)
      }
      100% {
         height: 4vh;
         width: 4vh;
         transform: translateY(-4vh)
      }
   }
   @keyframes slideToAlt {
      0% {
         height: 4vh;
         width: 4vh;
         transform: translateY(-4vh)
      }
      25% {
         height: 2vh;
         width: 2vh;
         transform: translateY(-4vh)
      }
      75% {
         height: 2vh;
         width: 2vh;
         transform: translateY(4vh)
      }
      100% {
         height: 4vh;
         width: 4vh;
         transform: translateY(4vh)
      }
   }

   @media (max-width: 1024px) {
      display: none;
   }
`