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

import PermMediaIcon from '@mui/icons-material/PermMedia';
import GifBoxIcon from '@mui/icons-material/GifBox';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {useNavigate} from 'react-router-dom'
import tweet from './Following.jpg'
import Trends from './Trends'
function Following(props) {
  var  person = document.getElementById("whidd")
  const navigate = useNavigate();
function foryou (){
    navigate("/Home")
}
  function allass(){
    navigate("/MyAcount");
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
            <p className="link-text">Profile</p>
          </div>
          <div className="link-flex">
            <MoreHorizIcon className='link-icon'></MoreHorizIcon>
            <p className="link-text">More</p>
          </div>
          <div className="link-flex mt-5">
            <PersonIcon className='link-icon'></PersonIcon>
            <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p>
          </div>
        </div>

      </div>
      {/* middle site */}
      <div className="Middles">
        <MiddleSite></MiddleSite>
        <div className="Twhead">
          <h1 className="Foy fs-5 mt-3 fw-bold " onClick={foryou}> For you</h1>
          
          <h1 className="Fos fs-5 mt-3 fw-bold active ">Following</h1>
        </div>

        <hr />
        <div className="haper">
          <PersonIcon className="PPic" onClick={allass}  ></PersonIcon>
          <textarea cols="30" rows="1" className="Whh" ></textarea>
          {/* <input  label="Whats Hapenning" className="Whh" placeholder="Whats Hapenning"  /> */}
          {/* <input type="text" placeholder="Whats Happening" className="Whh" /> */}
        </div>
        <br />
        
        {/* <hr className="hr" /> */}
        <div className="alfunc mt-3">
          <br />
          <PermMediaIcon></PermMediaIcon>
          <GifBoxIcon></GifBoxIcon>
          <BallotIcon></BallotIcon>
          <CalendarTodayIcon></CalendarTodayIcon>
          <button className="tbn">Tweet</button>
        </div>
        <hr />
        <h3 className="totwets">Show 57 Tweets</h3>
        <hr />
        <div className="feedss">
          <PersonIcon className="usser" onClick={allass} sx={{ fontSize: 50 }}></PersonIcon>
          {/* <p className='fnh'>Name Here</p> */}
          <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p>
          {/* <VerifiedIcon></VerifiedIcon> */}
          <p className="fem">Email@</p>
        </div>
        <div>
          <img src={tweet} alt="" className="tweetimg" />
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="Trends">
        <Trends></Trends>
      </div>
      
    </div>
  );
}


  

export default Following