import React, { useRef, useState } from 'react'
import Header from './Header'
import {checkValidData} from '../utils/validateForm';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGIN_BG_URL, PROFILE_ICON_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [validEmailOrPassword, setValidEmailOrPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  //form toggle function
  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  }
 const handleSubmit = () => {
  const fullnameValue = fullname.current?.value?.trim() || '';
  const userEmail = email.current?.value?.trim() || '';
  const userPassword = password.current?.value || '';

  const validationResult = checkValidData(userEmail, userPassword);

  if (validationResult !== true) {
    setErrorMessage(validationResult.message);
    setValidEmailOrPassword(false);
    return;
  }

  setErrorMessage('');
  setValidEmailOrPassword(true);

  const photoURL = PROFILE_ICON_URL;

  const dispatchUser = (user, fallbackName = '') => {
    dispatch(
      addUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName ?? fallbackName,
        photoURL: user.photoURL ?? photoURL,
      })
    );
  };

  const handleError = (error) => {
    setErrorMessage(error.message);
    setValidEmailOrPassword(false);
  };

  // SIGN UP
  if (!isSignInForm) {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(({ user }) =>
        updateProfile(user, { displayName: fullnameValue, photoURL }).then(() =>
          dispatchUser({ ...user, displayName: fullnameValue, photoURL }, fullnameValue)
        )
      )
      .catch(handleError);

    return;
  }

  // SIGN IN
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then(({ user }) => dispatchUser(user))
    .catch(handleError);
};

  const formTitle = isSignInForm ? "Sign In" : "Sign Up";
  return (
    <div>
      <Header />
      <div>
        <img className='h-full w-full object-cover' src={LOGIN_BG_URL} alt="Login Background" />
        <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
                 bg-black/85 p-16 rounded-md min-h-[420px] w-[420px] transition-colors duration-400">
          <h1 className='text-3xl font-bold mb-8 text-white'>{formTitle}</h1>
          {!isSignInForm && <input ref={fullname} className='p-3 my-2 bg-gray-700 rounded-md w-full text-white' type="text" placeholder='Full Name *' />}
          <input ref={email} className='p-3 my-2 bg-gray-700 rounded-md w-full text-white' type="email" placeholder='Email or Phone Number *' />
          <input ref={password} className='p-3 my-2 bg-gray-700 rounded-md w-full text-white' type="password" placeholder='Password *' />
          {!validEmailOrPassword && <p className="text-red-500">{errorMessage}</p>}
          <button className='bg-red-800 hover:bg-red-600 py-3 my-6 rounded-md w-full font-bold text-white' onClick={event => {event.preventDefault(); handleSubmit();}}>{formTitle}</button>
          <span className='text-white flex'> {isSignInForm ? "New here?" : "Already have an account?"}<p className='hover:underline text-white ml-3 cursor-pointer' onClick={toggleForm}> {isSignInForm ? "Sign Up" : "Sign In"} </p> </span>
        </form>
      </div>
    </div>
  )
}

export default Login
