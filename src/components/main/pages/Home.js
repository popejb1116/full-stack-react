import React, {useState, useContext, Fragment} from 'react'
import  {Redirect} from 'react-router-dom'
import {UserInfoContext} from '../../../context/UserInfoContext'

const Home = () => {

   const userInfoContext = useContext(UserInfoContext)

   const AuthUser = () => {

      const [shouldRedirect, setShouldRedirect] = useState(false)

      const handleShowNotepad = () => {
         setShouldRedirect(true)
      }

      return shouldRedirect ? (<Redirect to='/notepad'/>) : (
         <Fragment>
            <p>You're Signed In!!! Now you're talking my Changuage</p>
            <button onClick={handleShowNotepad}>Show Notepad</button>
         </Fragment>
      ) 
   }

   const NoAuthUser = () => {
      return <p>Please sign in, or don't. Frankly I don't give a Dean</p>
   }

   return userInfoContext.signedIn ? (<AuthUser/>) : (<NoAuthUser/>)
}

export default Home
