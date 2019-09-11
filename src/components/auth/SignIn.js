import React, {useState, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../config/firebase'

const SignIn = () => {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState()
   const [shouldRedirect, setShouldRedirect] = useState(false)

   const handleSignIn = async e => {
      e.preventDefault()
      setIsSubmitting(true)
      setErrorMessage()
      try {
         await auth.signInWithEmailAndPassword(email, password)
         setShouldRedirect(true)
      } catch (error) {
         setIsSubmitting(false)
         setErrorMessage(error.message)
         setEmail("")
         setPassword("")
      }
   }

   const Submitting = () => {
      return <p>Please wait while we sign you in...</p>
   }

   const ErrorMessage = () => {
      return <p>{errorMessage}</p>
   }


   return shouldRedirect ? (<Redirect to='/'/>) : (
      <Fragment>
         <form onSubmit={handleSignIn}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={isSubmitting}>Sign In</button>
         </form>
         {isSubmitting && <Submitting/>}
         {errorMessage && <ErrorMessage/>}
      </Fragment>
   )
}

export default SignIn
