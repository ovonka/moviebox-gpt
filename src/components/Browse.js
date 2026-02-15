import React, { use } from 'react'
import Header from './Header'
import { BROWSE_BG_URL } from '../utils/constants'
const Browse = () => {
  return (
    <div>
      <Header />
      <div>
         <img className='w-full' src={BROWSE_BG_URL} alt="Browse/Main Page Background" />
      </div>
    </div>
  )
}

export default Browse
