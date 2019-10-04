import React, {useState, useMemo} from 'react'
import {Redirect} from 'react-router-dom'
import {auth, firestore} from '../../../config/firebase'
import {StyledMainChild, StyledMessageCenter} from '../_MainStyledComponents'
import {StyledForm, StyledInputSection, StyledInput, StyledButton} from './_AuthStyledComponents'

const SignUp = () => {

   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [shouldRedirect, setShouldRedirect] = useState(false)
   const [message, setMessage] = useState("Signing up, really? Your funeral...")

   const MessageCenter = () => {
      return <StyledMessageCenter>{message}</StyledMessageCenter>
   }
   const messageMemo = useMemo(() => <MessageCenter/>, [message])

   const handleSignUp = async e => {
      e.preventDefault()
      setIsSubmitting(true)
      setMessage("Please wait while we sign you up...")
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
         setMessage(error.message)
         setFirstName("")
         setLastName("")
         setEmail("")
         setPassword("")
      }
   }

   return shouldRedirect ? (<Redirect to='/'/>) : (
      <StyledMainChild>
         {messageMemo}
         <StyledForm onSubmit={handleSignUp}>
            <StyledInputSection>
               <StyledInput type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
               <StyledInput type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
               <StyledInput type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
               <StyledInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </StyledInputSection>
            <StyledButton disabled={isSubmitting}>Sign Up</StyledButton>
         </StyledForm>
      </StyledMainChild>
   )
}

export default SignUp
