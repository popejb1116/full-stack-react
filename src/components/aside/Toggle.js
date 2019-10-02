import React, {useState} from 'react'
import styled from 'styled-components'

const Toggle = () => {

   const [defaultSelected, setDefaultSelected] = useState(true)

   return (
      <StyledToggle>
         <StyledTitle>Title</StyledTitle>
         <StyledSliderSection>
            <StyledOptionButton
               isDefault={true}
               defaultSelected={defaultSelected}
               onClick={() => setDefaultSelected(true)}
               onMouseDown={e => e.preventDefault()}
            >default</StyledOptionButton>
            <StyledSlider defaultSelected={defaultSelected}/>
            <StyledOptionButton
               isDefault={false}
               defaultSelected={defaultSelected}
               onClick={() => setDefaultSelected(false)}
               onMouseDown={e => e.preventDefault()}
            >alt</StyledOptionButton>
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
`

const StyledTitle = styled.p`
   color: ${props => props.theme.primary};
   font-size: 2rem;
   font-weight: bolder;
`

const StyledSliderSection = styled.section`
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-between;
   align-items: center;
   height: 20vh;
   width: 100%;
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
`