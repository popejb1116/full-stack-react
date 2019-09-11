import React, {useState, useEffect} from 'react'
import {auth, firestore} from '../config/firebase'

const UserInfoContext = React.createContext()

const UserInfoContextProvider = props => {

   const [signedIn, setSignedIn] = useState(false)
   const [userDocSnapshot, setUserDocSnapshot] = useState()
   const [notesCollectionSnapshot, setNotesCollectionSnapshot] = useState()

   useEffect(() => {

      let detachAuthListener
      let detachProfileListenter
      let detachNotesListener
      
      const getUserInfo = async() => {
         try {
            detachAuthListener = await auth.onAuthStateChanged(async user => {
               if (user) {
                  setSignedIn(true)
                  detachProfileListenter = await firestore.collection('users').doc(user.uid).onSnapshot(snapshot => {
                     setUserDocSnapshot(snapshot)
                  })
                  detachNotesListener = await firestore.collection('users').doc(user.uid).collection('notes').onSnapshot(snapshot => {
                     setNotesCollectionSnapshot(snapshot)
                  })
               } else {
                  setSignedIn(false)
               }
            })
         } catch (error) {
            console.log(error)
         }
      }
      getUserInfo()
      
      return () => {
         detachAuthListener()
         detachProfileListenter()
         detachNotesListener()
      }

   }, [])

   return (
      <UserInfoContext.Provider value={{
         signedIn,
         userDocSnapshot,
         notesCollectionSnapshot
      }}>
         {props.children}
      </UserInfoContext.Provider>
   )
}

export {UserInfoContext, UserInfoContextProvider}
