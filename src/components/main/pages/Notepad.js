import React, {useState, useContext, Fragment, useMemo, useEffect} from 'react'
import {UserInfoContext} from '../../../context/UserInfoContext'
import {auth, firestore} from '../../../config/firebase'
import {StyledMainChild, StyledMessageCenter} from '../_MainStyledComponents'
import styled from 'styled-components'
import editIcon from '../../../aesthetics/images/edit-icon.svg'
import deleteIcon from '../../../aesthetics/images/delete-icon.svg'
import confirmIcon from '../../../aesthetics/images/confirm-icon.svg'
import cancelIcon from '../../../aesthetics/images/cancel-icon.svg'

const Notepad = () => {

   const userInfoContext = useContext(UserInfoContext)
   const {notesCollectionSnapshot} = userInfoContext
   const [message, setMessage] = useState("Loading your notepad...")

   const MessageCenter = () => {
      return <StyledMessageCenter>{message}</StyledMessageCenter>
   }
   const messageMemo = useMemo(() => <MessageCenter/>, [message])

   useEffect(() => {
      notesCollectionSnapshot ? (
         setMessage("You've got notes...")
      ) : (
         setMessage("Loading your notepad...")
      )
   }, [notesCollectionSnapshot])

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
            // console.log(error)
            setMessage(error.message)
         }
      }

      return (
         <StyledAddNoteForm onSubmit={handleAddNote}>
            <StyledAddNoteInput type="text" placeholder="Note..." value={noteText} onChange={e => setNoteText(e.target.value)}/>
            <StyledAddNoteButton>Add</StyledAddNoteButton>
         </StyledAddNoteForm>
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
         <StyledNotes>
            {noteArray.map(note => {
               return <Note note={note} key={note.id}/>
            })}
         </StyledNotes>
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
               // console.log(error)
               setMessage(error.message)
            }
         }

         return (
            <StyledEditNoteForm onSubmit={handleEditNote}>
               <StyledEditNoteInput type="text" value={noteText} onChange={e => setNoteText(e.target.value)}/>
               <StyledButtonSection>
                  <StyledIconButton icon={confirmIcon}/>
                  <StyledIconButton icon={cancelIcon}
                     onClick={() => setEditMode(false)}
                  />
               </StyledButtonSection>
            </StyledEditNoteForm>
         )
      }

      const handleDelete = async e => {
         e.preventDefault()

         try {
            await firestore.collection('users').doc(auth.currentUser.uid).collection('notes').doc(note.id).delete()
         } catch (error) {
            // console.log(error)
            setMessage(error.message)
         }
      }

      return editMode ? (<EditNoteForm/>) : (
         <StyledNote>
            <StyledNoteText>{note.text}</StyledNoteText>
            <StyledButtonSection>
               <StyledIconButton 
                  icon={editIcon}
                  onClick={() => setEditMode(true)}
               />
               <StyledIconButton 
                  icon={deleteIcon}
                  onClick={handleDelete}
               />
            </StyledButtonSection>            
         </StyledNote>
      )
   }


   return (
      <StyledMainChild>
         {messageMemo}
         {!notesCollectionSnapshot ? (null) : (
            <Fragment>
               <AddNoteForm/>
               <Notes/>
            </Fragment>)
         }
      </StyledMainChild>
   )
}

export default Notepad

const StyledAddNoteForm = styled.form`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 4rem;
   width: 75%;
   margin-bottom: 2rem;
`

const StyledAddNoteInput = styled.input`
   background: ${props => props.theme.secondary};
   color: ${props => props.theme.primary};
   height: 100%;
   width: 70%;
   padding: 6px;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 1.5rem;
   &:focus{
      outline: none;
      border-color: ${props => props.theme.primary};
   }
`

const StyledAddNoteButton = styled.button`
   background-color: ${props => props.theme.primary};
   color: ${props => props.theme.secondary};
   height: 100%;
   width: 25%;
   border: solid 3px transparent;
   border-radius: 6px;
   font-size: 2rem;
   font-weight: bold;
   transition: background-color 0.5s, color 0.5s;
   &:hover {
      background-color: ${props => props.theme.secondary};
      color: ${props => props.theme.primary};
   }
   &:focus {
      outline: none;
      border-color: ${props => props.theme.secondary};
   }
`

const StyledNotes = styled.ul`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
   height: 100%;
   width: 100%;
`

const StyledNote = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 3.5rem;
   width: 75%;
   margin: 0.5rem 0;
   border: solid 3px ${props => props.theme.secondary};
   border-radius: 6px;
`

const StyledNoteText = styled.p`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   color: ${props => props.theme.accent};
   height: 100%;
   width: 70%;
   padding-left: 6px;
   font-size: 1.5rem;
   font-weight: 600;
`
const StyledButtonSection = styled.section`
   display: flex;
   justify-content: flex-end;
   align-items: center;
   height: 100%;
   width: 15%;
`

const StyledIconButton = styled.button`
   background: url(${props => props.icon}) no-repeat center center;
   background-color: ${props => props.theme.primary};
   height: 2.5rem;
   width: 2.5rem;
   margin: 0 6px;
   border: solid 1px transparent;
   border-radius: 6px;
   transition: background-color 0.5s;
   &:hover {
      background-color: ${props => props.theme.secondary};
   }
   &:focus {
      outline: none;
      border-color: ${props => props.theme.secondary};
   }
`

const StyledEditNoteForm = styled.form`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 3.5rem;
   width: 75%;
   margin: 0.5rem 0;
   border: solid 3px ${props => props.theme.secondary};
   border-radius: 6px;
`

const StyledEditNoteInput = styled.input`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   background: transparent;
   color: ${props => props.theme.accent};
   height: 100%;
   width: 80%;
   border: none;
   padding-left: 6px;
   font-size: 1.5rem;
   font-weight: 600;
`