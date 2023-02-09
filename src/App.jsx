
import Twitter from './twitter'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/Signup/Signup';
import PersonalMy from './PersonalMy';
import Following from './Following';
import React, { useEffect, useState } from "react";
import { auth } from './firebase';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import EditProfile from './EditProfile';
import MainPg from './MainPg';
function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (

    <>

      <Routes>
        <Route path="/" element={<MainPg />}  />
        
        <Route path="/Home" element={<Twitter name={userName} />} />
        <Route path="/MyAcount" element={<PersonalMy  name={userName}/>} />
        <Route path="/Following" element={<Following name={userName} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/editprofile" element={<EditProfile name={userName}/>}/>
      </Routes>
      {/* <MainPage></MainPage> */}

    </>
  )
}

export default App