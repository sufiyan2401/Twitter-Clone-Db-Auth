
// import Twitter from './twitter'
// import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom'
import LandingP from '../Screens/Registration/LandingP';
import UserCalculator from '../Screens/Twitter/UserCalculator';
import TwitterF from "../Screens/Twitter/TwitterF";
import UserProfile from "../Screens/Twitter/UserProfile";
import Following from "../Screens/Twitter/Following";
import Login from "../Screens/Registration/Login";
// import MainPage from './components/Signup/Signup';
// import PersonalMy from './PersonalMy';
// import Following from './Following';
// import { auth } from './firebase';
// import Login from './components/Login/Login';
import Signup from '../components/Signup/Signup'
import EditProfile from "../Screens/Twitter/EditProfile";
import { auth } from "./firebase";
// import EditProfile from './EditProfile';
// import MainPg from './MainPg';
// import TotalUsers from './TotalUsers';
function Routerss() {
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
                <Route path="/" element={<LandingP />} />
                <Route path="/Users" element={<UserCalculator />} />
                <Route path="/Home" element={<TwitterF name={userName} />} />
                <Route path="/MyAcount" element={<UserProfile name={userName} />} />
                <Route path="/Following" element={<Following name={userName} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/editprofile" element={<EditProfile name={userName} />} />
                {/* 6 */}
                {/* Done line 1 , 2 ,3,4 ,5,6*/}
                {/* <Route path="/signup" element={<Signup />} />
                <Route path="/editprofile" element={<EditProfile name={userName} />} /> */}
            </Routes>
            {/* <MainPage></MainPage> */}

        </>
    )
}

export default Routerss