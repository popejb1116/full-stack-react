import React, {useState, useEffect, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {auth} from '../../config/firebase'

const SignOut = () => {

   const [isSubmitting, setIsSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState()
   const [shouldRedirect, setShouldRedirect] = useState(false)

   useEffect(() => {

      setIsSubmitting(true)
      
      const attemptSignOut = async() => {
         try {
            await auth.signOut()
            setShouldRedirect(true)
         } catch (error) {
            setErrorMessage(error.message)
         }
      }
      attemptSignOut()
      
   }, [])

   const Submitting = () => {
      return <p>Please wait while we sign you in...</p>
   }

   const ErrorMessage = () => {
      return <p>{errorMessage}</p>
   }

   return shouldRedirect ? (<Redirect to='/'/>) : (
      <Fragment>
         {isSubmitting && <Submitting/>}
         {errorMessage && <ErrorMessage/>}
      </Fragment>
   )
}

export default SignOut
