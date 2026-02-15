import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LOGO_URL } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(false);

  const userName = useSelector((state) => state.user?.user?.name);
  const userPhotoURL = useSelector((state) => state.user?.user?.photoURL);
  
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    dispatch( addUser({uid: user.uid, email: user.email, name: auth?.currentUser?.displayName, photoURL: auth?.currentUser?.photoURL}) );
    setLoggedInUser(true);
    navigate('/browse');
  } else {
    navigate('/');
    setLoggedInUser(false);
    dispatch(removeUser());
  }
});
return () => unsubscribe();

}, [])
  
  const logOutUser = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate('/');
    }).catch((error) => {
      console.log("Error signing out: ", error);
    });
  }
  return (
    <div className='absolute justify-between flex w-full items-center m-4'>
      <img className='w-44 cursor-pointer' src={LOGO_URL} alt="Logo" />
       {loggedInUser &&
      <div className='flex items-center'>      
      <span className='text-white mr-2'>{userName}</span>
      <img className=" rounded-md cursor-pointer mr-2 w-8 h-8" src={userPhotoURL} alt="Profile Icon"></img> 
      <button className='text-white  bg-red-700  rounded-md mr-6 px-1 py-1' onClick={logOutUser}>Sign Out</button>
      </div>
      }
    </div>
  )
}

export default Header
