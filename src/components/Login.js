import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignedInForm, setIsSignedInForm] = useState(false);
  const toggleForm = () => {
    setIsSignedInForm(!isSignedInForm);
  }
  const formTitle = isSignedInForm ? "Sign In" : "Sign Up";
  return (
    <div>
      <Header />
      <div>
        <img className='h-full w-full object-cover' src="https://xboxwire.thesourcemediaassets.com/sites/2/2023/05/Background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.png" alt="Login Background" />
        <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
                 bg-black/85 p-16 rounded-md min-h-[420px] w-[420px] transition-colors duration-400">
          <h1 className='text-3xl font-bold mb-8 text-white'>{formTitle}</h1>
          {!isSignedInForm && <input className='p-3 my-2 bg-gray-700 rounded-md w-full' type="text" placeholder='Full Name' />}
          <input className='p-3 my-2 bg-gray-700 rounded-md w-full' type="email" placeholder='Email or Phone Number' />
          <input className='p-3 my-2 bg-gray-700 rounded-md w-full' type="password" placeholder='Password' />
          <button className='bg-red-800 hover:bg-red-600 py-3 my-6 rounded-md w-full font-bold text-white' onClick={event => event.preventDefault()}>{formTitle}</button>
          <span className='text-white flex'> {isSignedInForm ? "New here?" : "Already have an account?"}<p className='hover:underline text-white ml-3 cursor-pointer' onClick={toggleForm}> {isSignedInForm ? "Sign Up" : "Sign In"} </p> </span>
        </form>
      </div>
    </div>
  )
}

export default Login
