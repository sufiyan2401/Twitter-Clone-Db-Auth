import React from 'react'
import './App.css';
import MiddleSite from './MiddleSite';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import GifBoxIcon from '@mui/icons-material/GifBox';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom'
import tweet from './tweet.jpg'
import { Box } from '@mui/system';
import Trends from './Trends'
// import { ref, set, get, update, remove, child } from 'firebase/database'
import { getDatabase, ref, child, get } from "firebase/database";
import { useState } from 'react';

let ID = localStorage.getItem("id")
function EditProfile(props) {
  
    const [myObject,setMyObject] = useState({
        contactNumber:"",
        email:"",
        fullName:"",
        imageUrl:"",
        username:""
      })
      
        function Getdata(){
        const dbRef = ref(getDatabase());
        
        get(child(dbRef, `user/${ID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // alert("data received")
            // console.log(snapshot.val());
            var obj = {
              contactNumber:snapshot.val().contactNumber,
              email:snapshot.val().email,
              fullName:snapshot.val().fullName,
              imageUrl:snapshot.val().imageUrl,
              username:snapshot.val().username
            }
            setMyObject(obj)
            // console.log(obj);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
          alert("data not received")
        });}
        Getdata()
        var person = document.getElementById("whidd")
        const navigate = useNavigate();
    
        function allass() {
            navigate("/");
        }
        function back() {
            navigate("/Home")
        }
        function profile(){
            navigate("/MyAcount")
        }
        return (
            <div className="Container">
                {/* <div className="Middles">
          <MiddleSite></MiddleSite>
          </div> */}
                {/* middle site */}
    
                <div className="left-sidebar">
                    <div className="links-flex">
                        <div className="white-logo">
                            <a href="#">
                                <TwitterIcon className="twitter-white-logo"></TwitterIcon>
    
                            </a>
                        </div>
                        <div className="link-flex">
    
                            <HomeIcon className="link-icon"></HomeIcon>
                            <p className="link-text" onClick={back}>Home</p>
                        </div>
                        <div className="link-flex">
    
                            <TagIcon className='link-icon'></TagIcon>
                            <p className="link-text">Explore</p>
                        </div>
                        <div className="link-flex">
                            <NotificationsIcon className='link-icon'></NotificationsIcon>
                            <p className="link-text">Notifications</p>
                        </div>
                        <div className="link-flex">
                            <EmailIcon className='link-icon'></EmailIcon>
                            <p className="link-text">Messages</p>
                        </div>
                        <div className="link-flex">
                            <BookmarkIcon className='link-icon'></BookmarkIcon>
                            <p className="link-text">Bookmarks</p>
                        </div>
                        <div className="link-flex">
                            <ViewListIcon className='link-icon'></ViewListIcon>
                            <p className="link-text">Lists</p>
                        </div>
                        <div className="link-flex">
                            <PersonIcon className='link-icon'></PersonIcon>
                            <p className="link-text" onClick={profile}>Profile</p>
                        </div>
                        <div className="link-flex">
                            <MoreHorizIcon className='link-icon'></MoreHorizIcon>
                            <p className="link-text">More</p>
                        </div>
                        <div className="link-flex">
                            <PersonIcon className='link-icon' onClick={allass}></PersonIcon>
                            {/* <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                            <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p>
                        </div>
                    </div>
    
                </div>
                {/* middle site */}
                <div className="Middles">
                    <ArrowBackIcon onClick={back} className="fs-3 mt-2"></ArrowBackIcon>
                <div className="profile-container">
          <div className="header">
            <h1 className='fs-3'>Profile Picture:</h1><img
              className="avatar"
              // src="https://picsum.photos/200"
              src={myObject.imageUrl}
              alt="profile avatar"
            />
            <button>Change Picture</button>
            {/* <h1 className="username"><p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p></h1> */}
              
          </div>
            <h1 className="username"><p className='mt-3 fs-4 font-monospace'>Name:{myObject.fullName}</p></h1>
            
          <h1 className="username"><p className='mt-3 fs-4 font-monospace'> Contact:{myObject.contactNumber}</p></h1>
          <h1 className="username"><p className='mt-3 fs-4 font-monospace'> Bio:Null</p></h1>
          
          <hr />
          <div className="info">
            <p className="bio">
              
          
            </p>
            
          </div>
          
          
        </div>
    
                    {/* <Box className="d-flex d-none "> */}
                        {/* <ArrowBackIcon onClick={back} className="fs-3 mt-2"></ArrowBackIcon> */}
                        {/* <p className='ms-5'>Name Here </p> */}
                        {/* <p className='ms-5 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                    {/* </Box> */}
    
                    {/* <div className="Twhead"> */}
    
                    {/* </div> */}
    
    
                    {/* <div className="haper"> */}
    
    
                        {/* <input  label="Whats Hapenning" className="Whh" placeholder="Whats Hapenning"  /> */}
                        {/* <input type="text" placeholder="Whats Happening" className="Whh" /> */}
                    {/* </div>
                    <br />
                    <br />
                    <br /> */}
                    {/* <hr className="hr" /> */}
                    {/* <div className="alfunc">
                        <br />
    
    
                    </div> */}
    
    
    
                    {/* <div className="feedss">
    
                    </div>
                    <div>
    
    
                    </div> */}
                </div>
                <div className="Trends">
                    <Trends></Trends>
                </div>
    
            </div>
        );
}

export default EditProfile