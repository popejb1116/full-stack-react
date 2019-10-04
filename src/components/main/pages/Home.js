import React, {useState, useContext, Fragment, useMemo, useEffect} from 'react'
import  {Redirect} from 'react-router-dom'
import {UserInfoContext} from '../../../context/UserInfoContext'
import styled from 'styled-components'
import {StyledMainChild, StyledMessageCenter} from '../_MainStyledComponents'

const Home = () => {

   const userInfoContext = useContext(UserInfoContext)
   const {signedIn} = userInfoContext
   const [message, setMessage] = useState("Please sign in, or don't. Frankly I don't give a Dean")
   const [hicksIndex, setHicksIndex] = useState(0)

   const hicksQutoes = [
      "Watching television is like taking black spray paint to your third eye.",
      "It's always funny until someone gets hurt. Then it's just hilarious.",
      "I get a kick out of being an outsider constantly. It allows me to be creative. I don't like anything in the mainstream and they don't like me.",
      "By the way, if anyone here is in advertising or marketing, kill yourself.",
      "What’cha read’n for?",
      "I left in love, in laughter, and in truth, and wherever truth, love and laughter abide, I am there in spirit.",
      "Listen, the next revolution is gonna be a revolution of ideas."
   ]
   const Hicks = () => {
      return <StyledHicks>{hicksQutoes[hicksIndex]}</StyledHicks>
   }

   useEffect(() => {
      setHicksIndex(Math.floor(Math.random() * Math.floor(6)))
   }, [])

   useEffect(() => {
      signedIn ? (
         setMessage("You're Signed In!!! Now you're talking my Changuage")
      ) : (
         setMessage("Please sign in, or don't. Frankly I don't give a Dean")
      )      
   }, [signedIn])

   const MessageCenter = () => {
      return <StyledMessageCenter>{message}</StyledMessageCenter>
   }
   const messageMemo = useMemo(() => <MessageCenter/>, [message])

   const AuthUser = () => {

      const [shouldRedirect, setShouldRedirect] = useState(false)

      const handleShowNotepad = () => {
         setShouldRedirect(true)
      }

      return shouldRedirect ? (<Redirect to='/notepad'/>) : (            
         <StyledButton onClick={handleShowNotepad}>Show Notepad</StyledButton>
      ) 
   }

   return (
      <StyledMainChild>
         {messageMemo}
         {signedIn ? (<AuthUser/>) : (null)}
         <Hicks/>
      </StyledMainChild>
   )
}

export default Home

const StyledButton = styled.button`
   background-color: ${props => props.theme.primary};
   color: ${props => props.theme.secondary};
   height: 10vh;
   width: 50%;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 2rem;
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
`
const StyledHicks = styled.p`
   color: ${props => props.theme.accent};
   margin-top: 2rem;
   padding: 1rem 3rem;
   font-size: 2rem;   
   text-align: center;
   animation: reveal-hicks 3s forwards;
   @keyframes reveal-hicks {
      0% {
         opacity: 0;
      }
      100% {
         opacity: 1;
      }
   }
`