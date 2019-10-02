import React, {useState, useContext, Fragment} from 'react'
import {UserInfoContext} from '../../../context/UserInfoContext'
import {auth, firestore} from '../../../config/firebase'

const Notepad = () => {

   const userInfoContext = useContext(UserInfoContext)
   const {userDocSnapshot, notesCollectionSnapshot} = userInfoContext

   const Loading = () => {
      return <p>Loading your notepad...</p>
   }

   const AddNoteForm = () => {

      const [noteText, setNoteText] = useState("")

      const handleAddNote = async e => {
         e.preventDefault()

         try {
            const newNote = {
               noteText: noteText,
               createdAt: new Date(),
               lastUpdatedAt: null
            }
            await firestore.collection('users').doc(auth.currentUser.uid).collection('notes').add(newNote)
         } catch (error) {
            console.log(error)
         }
      }

      return (
         <form onSubmit={handleAddNote}>
            <input type="text" placeholder="Add Note" value={noteText} onChange={e => setNoteText(e.target.value)}/>
         </form>
      )
   }

   const Notes = () => {

      const noteArray = []

      notesCollectionSnapshot.forEach(note => {
         const noteData = note.data()
         const tempNote = {
            id: note.id,
            text: noteData.noteText
         }
         noteArray.push(tempNote)
      })
      
      return (
         <ul>
            {noteArray.map(note => {
               return <Note note={note} key={note.id}/>
            })}
         </ul>
      )
   }

   const Note = ({note}) => {

      const [editMode, setEditMode] = useState(false)

      const EditNoteForm = () => {

         const [noteText, setNoteText] = useState(note.text)

         const handleEditNote = async e => {
            e.preventDefault()

            try {
               await firestore.collection('users').doc(auth.currentUser.uid).collection('notes').doc(note.id).update({
                  noteText: noteText,
                  lastUpdatedAt: new Date()
               })
            } catch (error) {
               console.log(error)
            }
         }

         return (
            <form onSubmit={handleEditNote}>
               <input type="text" value={noteText} onChange={e => setNoteText(e.target.value)}/>
               <button>Update</button>
            </form>
         )
      }

      const handleDelete = async e => {
         e.preventDefault()

         try {
            await firestore.collection('users').doc(auth.currentUser.uid).collection('notes').doc(note.id).delete()
         } catch (error) {
            console.log(error)
         }
      }

      return editMode ? (<EditNoteForm/>) : (
         <Fragment>
            <span>{note.text}</span>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <br/>
         </Fragment>
      )
   }

   return !notesCollectionSnapshot ? (<Loading/>) : (
      <Fragment>
         <AddNoteForm/>
         <Notes/>
      </Fragment>
   )
}

export default Notepad
