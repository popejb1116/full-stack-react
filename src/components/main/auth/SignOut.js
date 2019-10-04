import React, {useState, useEffect, useMemo} from 'react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../../config/firebase'
import {StyledMainChild, StyledMessageCenter} from '../_MainStyledComponents'

const SignOut = () => {
   const [shouldRedirect, setShouldRedirect] = useState(false)
   const [message, setMessage] = useState("Signing out, peace!")

   const MessageCenter = () => {
      return <StyledMessageCenter>{message}</StyledMessageCenter>
   }
   const messageMemo = useMemo(() => <MessageCenter/>, [message])

   useEffect(() => {
      
      const attemptSignOut = async() => {
         try {
            await auth.signOut()
            setShouldRedirect(true)
         } catch (error) {
            setMessage(error.message)
         }
      }
      attemptSignOut()      
   }, [])

   return shouldRedirect ? (<Redirect to='/'/>) : (
      <StyledMainChild>
         {messageMemo}
      </StyledMainChild>
   )
}

export default SignOut
