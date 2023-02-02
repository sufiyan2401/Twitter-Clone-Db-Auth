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
import { getAuth, signOut } from "firebase/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom'
import tweet from './tweet.jpg'
import { Box } from '@mui/system';
import Trends from './Trends'
import {Link} from 'react-router-dom'
// import { ref, set, get, update, remove, child } from 'firebase/database'
import { getDatabase, ref, child, get } from "firebase/database";
import { useState } from 'react';
const dbRef = ref(getDatabase());
let ID = localStorage.getItem("id")
function PersonalMy(props) {
  function seeprofile(){
    navigate("/editprofile")
  }
  const [myObject,setMyObject] = useState({
    contactNumber:"",
    email:"",
    fullName:"",
    imageUrl:"",
    username:""
  })
  const [myTweets,setMyTweets] = useState({
    Tweets:"",
    
  })
  const getweets =()=>{
    get(child(dbRef, `Tweets/${ID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
      setMyTweets(snapshot.val());
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
                        <Link to="/Home"><p className="link-text" onClick={back}>Home</p></Link>
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
                    <ExitToAppIcon   className='link-icon'/>
                    <p className="link-text" onClick={Signout}>SignOut</p>
                        {/* <PersonIcon className='link-icon' onClick={allass}></PersonIcon> */}
                        {/* <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                        {/* <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                    </div>
                </div>

            </div>
            {/* middle site */}
            <div className="Middles">
                <ArrowBackIcon onClick={back} className="fs-3 mt-2"></ArrowBackIcon>
            <div className="profile-container">
      <div className="header">
        {/* <ArrowBackIcon onClick={back} className="fs-3 mt-2"></ArrowBackIcon> */}
        <img
          className="avatar"
          // src="https://picsum.photos/200"
          src={myObject.imageUrl}
          alt="profile avatar"
        />
        {/* <h1 className="username"><p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p></h1> */}
        <h1 className="username"><p className='mt-3 fs-4 font-monospace'>{myObject.fullName}</p></h1>
          
      </div>
      <h1 className="username"><p className='mt-3 fs-4 font-monospace'>{myObject.username}</p></h1>
      <button className='bg-info text-white border border-info-subtle rounded-pill'onClick={seeprofile} >Edit Profile</button>
      <hr />
      <div className="info">
        <p className="bio">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      
        </p>
        <p className="location">
          <i className="fas fa-map-marker-alt"></i> Location
        </p>
        <p className="website">
          <i className="fas fa-globe"></i> Website
        </p>
      </div>
      <div className="stats">
        <div className="stat">
          <p className="number">245</p>
          <p className="label">Tweets</p>
        </div>
        <div className="stat">
          <p className="number">2.5K</p>
          <p className="label">Followers</p>
        </div>
        <div className="stat">
          <p className="number">245</p>
          <p className="label">Following</p>
        </div>
      </div>
    </div>
      <div clasName="FunctAccs ">
        <ul className="d-flex justify-content-evenly Fuct">
          <li className='fs-5 active'>
            Tweets
          </li>
          <li className='fs-5'>
            Tweets&Replies
          </li>
          <li className='fs-5'>
            Medias
          </li>
          <li className='fs-5'>
            Links
          </li>
        </ul>
      </div>
      {Object.values(myTweets).map((value)=>{
          // console.log(value)
          return(<>
          <div className="feedss">
          <img className="Ppic avatar"  onClick={allass} sx={{ fontSize: 50 }} src={myObject.imageUrl} ></img>
          {/* <p className='fnh mt-3 fs-4 font-monospace '>{props.name ? ` ${props.name}` : ""}</p> */}
          <p className='fnh mt-3 fs-4 font-monospace '>{myObject.fullName}</p>
          {/* <VerifiedIcon></VerifiedIcon> */}
          <p className="fem">@{myObject.username}</p>
          {/* <p className="fem">@{props.name ? ` ${props.name}` : ""}</p> */}
        </div>
          <p className="fem">{value.Tweets}</p>
        <div>

          <img src={value.url} alt="Tweet Image" className="tweetimg " />

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







export default PersonalMy
