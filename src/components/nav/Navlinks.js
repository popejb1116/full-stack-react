import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks = () => {
   return (      
      <ul>
         <li>
            <Link to='/'>Home</Link>
         </li>
         <li>
            <Link to='/signin'>Sign In</Link>
         </li>
         <li>
            <Link to='/signout'>Sign Out</Link>
         </li>
         <li>
            <Link to='/signup'>Sign Up</Link>
         </li>
      </ul>      
   )
}

export default Navlinks
