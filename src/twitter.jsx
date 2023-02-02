import './App.css';
import Following from './Following.jpg'
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
import { getAuth, signOut } from "firebase/auth";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import GifBoxIcon from '@mui/icons-material/GifBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Navigate, useNavigate } from 'react-router-dom'
// import { getAuth, signOut } from "firebase/auth";
// import tweet from './tweet.jpg'
import Trends from './Trends'
import React, { useState } from 'react';
import {storage} from './firebase'
// import {v4} from "uuid"
// import {} from './firebase/storage'
// import { signOut } from 'firebase/auth';
// import {auth,db} from './firebase'
import { getDatabase, ref, set, push ,child, get } from "firebase/database";
import { uid } from "uid";
import { uploadBytes,ref as storageRef , getDownloadURL} from 'firebase/storage';
function App(props) {
  const navigate = useNavigate();
  let ID = localStorage.getItem("id")
  // console.log(ID)
  const dbRef = ref(getDatabase());

  const [imageUpload,setImageUpload]=useState(null);
  const [tweet, setTweet] = useState("");
  const handletextchange = (e) => {
    setTweet(e.target.value)
  }
  
  const [myObject,setMyObject] = useState({
    Tweets:"",
    
  })
  const [myInfo,setMyInfo] = useState({
    contactNumber:"",
    email:"",
    fullName:"",
    imageUrl:"",
    username:""
  })
  
  const getweets =()=>{
    get(child(dbRef, `Tweets/${ID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        setMyObject(snapshot.val());
        // alert("data received")
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      alert("data not received")
    });
  }

  getweets()
  function Getdata(){
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
        setMyInfo(obj)
        // console.log(obj);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      alert("data not received")
    });}
    Getdata()
    function Signout(){
      
const auth = getAuth();
signOut(auth).then(() => {
  navigate("/login")
  alert("Sign-out successful.")
  // Navigate("/login")
}).catch((error) => {
  alert(error)
});

    }
  function writeUserData() {
    // if(imageUpload==null) {return}
    // else{
    const imageRef = storageRef(storage,`images/${imageUpload  }`)
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(storageRef(storage,`images/${imageUpload  }` ))
  .then((url) => {
    console.log(url)
    
    const db = getDatabase();
    push(ref(db,`Tweets/${ID}`), {
      Tweets: tweet,
      url:url
    });
    
    alert("Your Tweet Has Been Sended")
  })
  .catch((error) => {
    // Handle any errors
  });

      console.log(snapshot)
      // alert("Image Uploaded")
      
    })
  }
  var person = document.getElementById("whidd")
  

  function allass() {
    navigate("/MyAcount");
  }
  function following() {
    navigate("/Following")
  }
  function profile() {
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
            <p className="link-text">Home</p>
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
            <p className="link-text" onClick={getweets}>Get Tweets</p>
          </div>

          <div className="link-flex">
                    <ExitToAppIcon   className='link-icon'/>
                    <p className="link-text" onClick={Signout}>SignOut</p>
                       
                    </div>

        </div>

      </div>
      {/* middle site */}
      <div className="Middles">
        <MiddleSite></MiddleSite>
        <div className="Twhead">
          <h1 className="Foy fs-5 mt-3 fw-bold  active">For you</h1>

          <h1 className="Fos fs-5 mt-3 fw-bold" onClick={following}>Following</h1>
        </div>

        <hr />
        <div className="haper">
          {/* <PersonIcon className="PPic" onClick={allass}  ></PersonIcon> */}
          <img className="PPic avatar" onClick={allass}  src={myInfo.imageUrl} />
          {/* <Tweetsender /> */}
          {/* <Crud /> */}

          <textarea cols="30" rows="1" className="Whh" name="" value={tweet} onChange={handletextchange}></textarea>

          {/* <input  label="Whats Hapenning" className="Whh" placeholder="Whats Hapenning"  /> */}
          {/* <input type="text" placeholder="Whats Happening" className="Whh" /> */}
        </div>
        <br />

        {/* <hr className="hr" /> */}
        <div className="alfunc mt-3">
          <br />
          {/* <PermMediaIcon type="file"></PermMediaIcon> */}
          <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}} />
          <GifBoxIcon></GifBoxIcon>
          <BallotIcon></BallotIcon>
          <CalendarTodayIcon></CalendarTodayIcon>
          <button className="tbn" onClick={writeUserData} >Tweet</button>
        </div>
        <hr />
        <h3 className="totwets">Show 57 Tweets</h3>
        <hr />
        
          
        {Object.values(myObject).map((value)=>{
          // console.log(value)
          return(<>
          <div className="feedss">
          <img className="Ppic avatar"  onClick={allass} sx={{ fontSize: 50 }} src={myInfo.imageUrl} ></img>
          {/* <p className='fnh mt-3 fs-4 font-monospace '>{props.name ? ` ${props.name}` : ""}</p> */}
          <p className='fnh mt-3 fs-4 font-monospace '>{myInfo.fullName}</p>
          {/* <VerifiedIcon></VerifiedIcon> */}
          <p className="fem">@{myInfo.username}</p>
          {/* <p className="fem">@{props.name ? ` ${props.name}` : ""}</p> */}
        </div>
          <p className="fem">{value.Tweets}</p>
        <div>

          <img src={value.url} alt="Tweet Image" className="tweetimg " />
<hr />
          {/* <p>{myObject.Tweets}</p> */}
          {/* <img src={Following} alt="" className="tweetimg" /> */}
          <ul>
            <li></li>
          </ul>
        </div>
        </>
        )})}
       
      </div>
      
      <div className="Trends">
        <Trends></Trends>
      </div>

    </div>
  );
}

export default App;
