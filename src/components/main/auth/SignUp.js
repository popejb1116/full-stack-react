import React, {useState, Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {auth, firestore} from '../../../config/firebase'

const SignUp = () => {

   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState()
   const [shouldRedirect, setShouldRedirect] = useState(false)

   const handleSignUp = async e => {
      e.preventDefault()
      setIsSubmitting(true)
      setErrorMessage()
      try {
         const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            joinedAt: new Date()
         }
         const firstNote = {
            noteText: "My first note",
            createdAt: new Date(),
            lastUpdatedAt: null
         }
         await auth.createUserWithEmailAndPassword(email, password)
         await firestore.collection('users').doc(auth.currentUser.uid).set(newUser)
         await firestore.collection('users').doc(auth.currentUser.uid).collection('notes').add(firstNote)
         setShouldRedirect(true)
      } catch (error) {
         setIsSubmitting(false)
         setErrorMessage(error.message)
         setFirstName("")
         setLastName("")
         setEmail("")
         setPassword("")
      }
   }

   const Submitting = () => {
      return <p>Please wait while we sign you up...</p>
   }

   const ErrorMessage = () => {
      return <p>{errorMessage}</p>
   }


   return shouldRedirect ? (<Redirect to='/'/>) : (
      <Fragment>
         <form onSubmit={handleSignUp}>
            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={isSubmitting}>Sign Up</button>
         </form>
         {isSubmitting && <Submitting/>}
         {errorMessage && <ErrorMessage/>}
      </Fragment>
   )
}

export default SignUp
