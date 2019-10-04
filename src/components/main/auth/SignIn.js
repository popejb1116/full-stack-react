import React, {useState, useMemo} from 'react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../../config/firebase'
import {StyledMainChild, StyledMessageCenter} from '../_MainStyledComponents'
import {StyledForm, StyledInputSection, StyledInput, StyledButton} from './_AuthStyledComponents'

const SignIn = () => {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [shouldRedirect, setShouldRedirect] = useState(false)
   const [message, setMessage] = useState("Sign In!!")

   const MessageCenter = () => {
      return <StyledMessageCenter>{message}</StyledMessageCenter>
   }
   const messageMemo = useMemo(() => <MessageCenter/>, [message])

   const handleSignIn = async e => {
      e.preventDefault()
      setIsSubmitting(true)
      setMessage("Please wait while we sign you in...")
      try {
         await auth.signInWithEmailAndPassword(email, password)
         setShouldRedirect(true)
      } catch (error) {
         setIsSubmitting(false)
         setMessage(error.message)
         setEmail("")
         setPassword("")
      }
   }

   return shouldRedirect ? (<Redirect to='/'/>) : (
      <StyledMainChild>
         {messageMemo}
         <StyledForm onSubmit={handleSignIn}>
            <StyledInputSection>
               <StyledInput type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
               <StyledInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </StyledInputSection>
            <StyledButton disabled={isSubmitting}>Sign In</StyledButton>
         </StyledForm>
      </StyledMainChild>
   )
}

export default SignIn

