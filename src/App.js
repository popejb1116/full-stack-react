import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Aside from './components/aside/Aside'
import Footer from './components/footer/Footer'

function App() {
   return (
      <BrowserRouter>
         <StyledApp>
            <Header/>
            <Main/>
            <Aside/>
            <Footer/>
         </StyledApp>
      </BrowserRouter>
   )
}

export default App

const StyledApp = styled.div`
   display: grid;
   grid-template-columns: repeat(10, 1fr);
   grid-template-rows: 15vh auto 10vh;
   grid-template-areas: 
      " h h h h h h h h h h "
      " . m m m m m m . a a "
      " f f f f f f f f f f "
   ;
   height: 100vh;

   @media (max-width: 1024px) {
      grid-template-rows: 15vh 15vh auto 10vh;
      grid-template-areas: 
         " h h h h h h h h h h "
         " . a a a a a a a a . "
         " . m m m m m m m m . "
         " f f f f f f f f f f "
      ;
   }

   @media (max-width: 414px) {
      grid-template-areas: 
         " h h h h h h h h h h "
         " a a a a a a a a a a "
         " m m m m m m m m m m "
         " f f f f f f f f f f "
      ;
   }
`