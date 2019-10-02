import React from 'react'
import styled from 'styled-components'
import {Route} from 'react-router-dom'
import Home from './pages/Home'
import Notepad from './pages/Notepad'
import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'
import SignUp from './auth/SignUp'
import bg  from '../../aesthetics/images/blur_light-desktop.jpg'

const Main = () => {
   return (
      <StyledMain>
         <img src={bg} alt="blur-bg"/>
         <Route path='/' exact component={Home}/>
         <Route path='/signin' component={SignIn}/>
         <Route path='/signout' component={SignOut}/>
         <Route path='/signup' component={SignUp}/>
         <Route path='/notepad' component={Notepad}/>
      </StyledMain>
   )
}

export default Main

const StyledMain = styled.main`
   grid-area: m;

   margin: 1vh 0;
   border: solid 3px ${props => props.theme.secondary};
   border-radius: 6px;

   position: relative;
   img {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
   }
   /* background: url(${bg}) no-repeat center center;
   background-size: cover; */
`