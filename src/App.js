import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Navlinks from './components/nav/Navlinks'
import Home from './components/pages/Home'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import SignUp from './components/auth/SignUp'
import Notepad from './components/pages/Notepad'

function App() {
   return (
      <BrowserRouter>
         <Navlinks/>
         <Route path='/' exact component={Home}/>
         <Route path='/signin' component={SignIn}/>
         <Route path='/signout' component={SignOut}/>
         <Route path='/signup' component={SignUp}/>
         <Route path='/notepad' component={Notepad}/>
      </BrowserRouter>
   )
}

export default App
