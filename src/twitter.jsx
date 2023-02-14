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
import ClearIcon from '@mui/icons-material/Clear';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Navigate, useNavigate } from 'react-router-dom'
import twee from './tweet.jpg'

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

// import { getAuth, signOut } from "firebase/auth";
// import tweet from './tweet.jpg'
import Trends from './Trends'
import React, { useState,useEffect } from 'react';
import {storage} from './firebase'
// import {v4} from "uuid"
// import {} from './firebase/storage'
// import { signOut } from 'firebase/auth';
// import {auth,db} from './firebase'
import { getDatabase, ref, set, push ,child, get } from "firebase/database";
import { uid } from "uid";
import { uploadBytes,ref as storageRef , getDownloadURL} from 'firebase/storage';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  // position: 'absolute',
  // top: '30%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 600,
  // // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App(props) {
  const [open, setOpen] = React.useState(false);
  const mOpen = () => setOpen(true);
  const mClose = () => setOpen(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [score, setScore] = useState(0);
  // const Timing = myObject.sort 
  const [milliseconds, setMilliseconds] = useState(new Date().getTime());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMilliseconds(new Date().getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  
    const handleOpen = () => {
      setSidebarOpen(true);
    };
  


  const handleClose = () => {
    setSidebarOpen(false);
  };

  const navigate = useNavigate();
  let ID = localStorage.getItem("id")
  // console.log(ID)
  const dbRef = ref(getDatabase());

  const [imageUpload,setImageUpload]=useState(null);
  const [tweet, setTweet] = useState("");
  const handletextchange = (e) => {

    setTweet(e.target.value)
  }
  
  const [myObject,setMyObject] = useState([])
  
  const [myInfo,setMyInfo] = useState({
    contactNumber:"",
    email:"",
    fullName:"",
    imageUrl:"",
    username:""
  })
  
  const getweets =()=>{
    get(child(dbRef, `Tweets/`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        let mesage = Object.values(snapshot.val())
        // console.log(mesage,"Hello")
        const alltweets = [];
        const totaltwe = [];
        Object.values(mesage).forEach((items,index)=>{
          Object.values(items).forEach((ite,inde)=>{
            //  console.log(inde)
             var toow =  totaltwe.push(inde)
            //  console.log(Math.max(totaltwe));
            // console.log('Item: ', ite);
            alltweets.push(ite);
           })
        });
        // console.log(alltweets , "alltwet");
        let bryp =  (Object.keys(alltweets));
         let soce = (Math.max(...bryp))+1
         setScore(soce)
        //  setScore(Math.max(...bryp))
        // setMyObject(alltweets);
        //  let mapping = Object.values(...mesage)
        //  console.log(mapping , "80")
        //  mapping.map((item,index)=>{
        //   console.log(index)
        //   console.log(item.Tweets)
        //   console.log(item.url)
        //   // console.log(item.Tweets)
        //   // console.log(item.url)
        //  })
        
        // console.log(Object.keys.val(mesage))
        // const tweetArray = Object.values(snapshot.val()).map(value => value)
        alltweets.sort((a, b) => b.Time - a.Time);
        // console.log('ttt', tweetArray)
        setMyObject(alltweets);
        // alert("data received")
      } else {
        // console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      alert("data not received")
    });
  }

  // useEffect(() => {
    getweets()
  // },[])
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
  navigate("/")
  alert("Sign-out successful.")
  // Navigate("/login")
}).catch((error) => {
  alert(error)
});

    }
  function writeUserData() {
    
    // if(imageUpload==null) {return}
    // else{
      if(tweet==""){
        alert("Tweet Not Be Empty")
        return
      }
       if(imageUpload===null){
        const db = getDatabase();
    push(ref(db,`Tweets/${ID}`), {
      
      Tweets: tweet,
      Time:milliseconds
      // url:url,
    })
    .then(()=>{
alert("tweet sended")
setTweet("");
    }).catch((error)=>{
      alert("error")
    })
      }else{
      const imageRef = storageRef(storage,`images/${imageUpload  }`)
      uploadBytes(imageRef, imageUpload).then((snapshot)=>{
        getDownloadURL(storageRef(storage,`images/${imageUpload  }` ))
        .then((url) => {
          console.log(url)
          
    const db = getDatabase();
    push(ref(db,`Tweets/${ID}`), {
      
      Tweets: tweet,
      url:url,
      Time:milliseconds
    });
    
    //  setScore(score + 1)
     setTweet("");
     setImageUpload(null)
    alert("Your Tweet Has Been Sended")
  })
  .catch((error) => {
    // Handle any errors
  });

      console.log(snapshot)
      // alert("Image Uploaded")
      
    })
  }}
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
     
      <div className="ls d-none ">
        <div className="lf">
          <div className="white-logo">
            
              <h2 className='sidhead'>Acount Info</h2>
          </div>
          <div className="lkf">

            {/* <HomeIcon className="ll"></HomeIcon>
            <p className="lt">Home</p> */}
            <img className=" avatar " onClick={allass}  src={myInfo.imageUrl} />
          </div>
          <div className="lkf">

            {/* <TagIcon className='link-icon'></
            TagIcon>
            <p className="lt">Explore</p> */}
             <p className='fnh mt-3 sidname '>{myInfo.fullName}</p>
             
          </div>
          <div className="lkf">
          <p className='fnh  sidusername '>{myInfo.username}</p>
          </div>
          
          <div className="lkf">
            <BookmarkIcon className='link-icon'></BookmarkIcon>
            <p className="lt">Bookmarks</p>
          </div>
          <div className="lkf">
            <ViewListIcon className='link-icon'></ViewListIcon>
            <p className="lt">Lists</p>
          </div>
          <div className="lkf">
            <PersonIcon className='link-icon'></PersonIcon>
            <p className="lt" onClick={profile}>Profile</p>
          </div>
          
          <div className="lkf">
                    <ExitToAppIcon   className='ll'/>
                    <p className="lt" onClick={Signout}>SignOut</p>
                       
                    </div>

        </div>

      </div>

      <div className="left-sidebar">
        <div className="links-flex">
          <div className="white-logo">
            <a href="#">
              <TwitterIcon variant="h1" className="twitter-white-logo"></TwitterIcon>

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
            <MoreHorizIcon className='c'></MoreHorizIcon>
            <p className="link-text" onClick={getweets}>Get Tweets</p>
          </div>

          <div className="link-flex">
                    <ExitToAppIcon   className='link-icon'/>
                    <p className="link-text" onClick={Signout}>SignOut</p>
                       
                    </div>
          <div className="link-flex feather">
          <HistoryEduIcon sx={{fontSize:40}} className="bg-info rounded-circle feather"/> 
                       
                    </div>

        </div>

      </div>
      {/* middle site */}
      <div className="Middles post-sidersc ">
      <div className="white-logo resptw ">
            <a href="#">
              {/* <PersonIcon variant="h1" className="twitter-white-logo "></PersonIcon> */}
              <img className="Ppic avatar"  onClick={handleOpen} sx={{ fontSize: 50 }} src={myInfo.imageUrl} ></img>
              {sidebarOpen && (
                <>
                 <div className="ls">
        <div className="lf">
          <div className="white-logo d-flex justify-content-evenly">
            
              <h2 className='sidhead'>Acount Info</h2>
              <h5 onClick={handleClose} className="closs">X</h5>

          </div>
          <div className="lkf">

            {/* <HomeIcon className="ll"></HomeIcon>
            <p className="lt">Home</p> */}
            <img className=" avatar " onClick={allass}  src={myInfo.imageUrl} />
          </div>
          <div className="lkf">

            {/* <TagIcon className='link-icon'></
            TagIcon>
            <p className="lt">Explore</p> */}
             <p className='fnh mt-3 sidname '>{myInfo.fullName}</p>
             
          </div>
          <div className="lkf">
          <p className='fnh  sidusername '>{myInfo.username}</p>
          </div>
          
          <div className="lkf">
            <BookmarkIcon className='link-icon'></BookmarkIcon>
            <p className="lt">Bookmarks</p>
          </div>
          <div className="lkf">
            <ViewListIcon className='link-icon'></ViewListIcon>
            <p className="lt">Lists</p>
          </div>
          <div className="lkf">
            <PersonIcon className='link-icon'></PersonIcon>
            <p className="lt" onClick={profile}>Profile</p>
          </div>
          
          <div className="lkf">
                    <ExitToAppIcon   className='ll'/>
                    <p className="lt" onClick={Signout}>SignOut</p>
                       
                    </div>

        </div>

      </div>
                          {/* <button onClick={handleClose}>Close</button>
                          <p>Sidebar content goes here</p> */}
                          </>
              )}
            </a>
            <a href="#">
              <TwitterIcon variant="h1" className="link-icon birdd"></TwitterIcon>
            </a>
          </div>
        <MiddleSite></MiddleSite>
        <div className="Twhead">
          <h1 className="Foy fs-5 mt-3 fw-bold  active">For you</h1>

          <h1 className="Fos fs-5 mt-3 fw-bold" onClick={following}>Following</h1>
        </div>

        <hr />
        <div className="haper">
          
          <img className="PPic avatar maintweetph" onClick={allass}  src={myInfo.imageUrl} />
          
          <textarea cols="50" rows="1" className="Whh" name="" value={tweet} onChange={handletextchange} placeholder="What's Happening.."></textarea>
        </div>
        <br />

        {/* <hr className="hr" /> */}
        <div className="alfunc">
          <br />
          {/* <PermMediaIcon type="file"></PermMediaIcon> */}
          {/* <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}} className="info" /> */}
          {/* <input type="file" class="btn btn-outline-primary" /> */}
          <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Button variant="contained" component="label"> */}
        
        {/* <input hidden accept="image/*" multiple type="file" /> */}
      {/* </Button> */}
      <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event)=>{setImageUpload(event.target.files[0])}}>
        <input hidden accept="image/*" type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
        <PhotoCamera />
      </IconButton>
    </Stack>

          <GifBoxIcon></GifBoxIcon>
          <BallotIcon></BallotIcon>
          <CalendarTodayIcon></CalendarTodayIcon>
          <button className="tbn" onClick={writeUserData} disabled={!tweet} >Tweet</button>
        </div>
        <hr className='rts' />
        <h3 className="totwets">Show {score} Tweets</h3>
        <hr />
        
        
        {myObject.map((value)=>{
          // console.log(value)
          return(<>
          <div className=''>
          <div className='w'>
          {/* <div className='col-sm col-lg'> */}
          <div className="post-side">
          <div className="feedss">
          <img className="Ppic avatar"  onClick={allass} sx={{ fontSize: 50 }} src={myInfo.imageUrl} ></img>
          {/* <p className='fnh mt-3 fs-4 font-monospace '>{props.name ? ` ${props.name}` : ""}</p> */}
          <p className='fnh mt-2 fs-6 font-monospace '>{myInfo.fullName}</p>
          {/* <VerifiedIcon></VerifiedIcon> */}
          {/* {milliseconds} */}
          <p className="fem fnh mt-2 fs-6 font-monospace fw-lighter">@{myInfo.username}</p>
          {/* <p className="fem">@{props.name ? ` ${props.name}` : ""}</p> */}
        </div>
          <p className="fem">{value.Tweets}</p>
          
        <div>

          {/* <img src={twee} alt="Tweet Image" className="tweetimg " /> */}
          <img src={value.url} alt="Tweet Image" className="tweetimg " />
<hr />
          {/* <p>{myObject.Tweets}</p> */}
          {/* <img src={Following} alt="" className="tweetimg" /> */}
          {/* <ul>
            <li></li>
          </ul> */}
        </div>
        </div>
        </div>
        {/* </div> */}
        </div>
        
        </>
        )})}
       
<footer>
<div className="">
          <HistoryEduIcon sx={{fontSize:60}} onClick={mOpen} className=" feather stickmsge  rounded-circle "/> 
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="main-modal "
      >
        <Box sx={style} className="modalmm">

          
        
          <ClearIcon onClick={mClose} className="dele" />
          <Stack direction="row" alignItems="center" spacing={2}>
          <div className="haper">
          
          <img className=" avatar maintweetph" onClick={allass}  src={myInfo.imageUrl} />
          <textarea type="text" className='inapa' placeholder="What's Happening"  value={tweet} onChange={handletextchange}/>
          {/* <textarea cols="10" rows="1" className="Whh" name="" value={tweet} onChange={handletextchange}></textarea> */}
        </div>
          
    </Stack>
          <hr />
          <div className="postw">
          <br />
          {/* <PermMediaIcon type="file"></PermMediaIcon> */}
          {/* <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}} className="info" /> */}
          {/* <input type="file" class="btn btn-outline-primary" /> */}
          <Stack direction="row" alignItems="center" spacing={0}>
      {/* <Button variant="contained" component="label"> */}
        
        {/* <input hidden accept="image/*" multiple type="file" /> */}
      {/* </Button> */}
      <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event)=>{setImageUpload(event.target.files[0])}}>
        <input hidden accept="image/*" type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
        <PhotoCamera className='camera'/>
      </IconButton>
    </Stack>

          <GifBoxIcon></GifBoxIcon>
          <BallotIcon></BallotIcon>
          <CalendarTodayIcon></CalendarTodayIcon>
          <button className="tbn" disabled={!tweet} onClick={writeUserData} >Tweet</button>
        </div>
        
        </Box>
      </Modal>

                    </div>
</footer>
      </div>
      
      <div className="Trends">
        <Trends></Trends>
      </div>
    </div>
  );
}

export default App;
