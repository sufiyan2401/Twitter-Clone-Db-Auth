import React from 'react'
import '../App.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import SettingsIcon from '@mui/icons-material/Settings';
import tweet from '../tweet.jpg'
import Trends from '../Trends'
import SignupBar from '../SignupBar';
import twitter from '../twitter'
import { Route, Routes } from 'react-router-dom';
function MainPage() {

  return (

    <div className="Container">
      

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

        </div>

      </div>
      {/* middle site */}
      <div className="Middles">

        <div className="Twhead">
          <h1 className="Foy">For you</h1>
          <h1 className="Fos"><SettingsIcon></SettingsIcon></h1>
        </div>

        <hr />
        <div className="haper">


          {/* <input  label="Whats Hapenning" className="Whh" placeholder="Whats Hapenning"  /> */}
          {/* <input type="text" placeholder="Whats Happening" className="Whh" /> */}
        </div>

        {/* <hr className="hr" /> */}
        <div className="alfunc">
          <br />

        </div>

        <h3 className="totwets"></h3>

        <div className="feedss">
          {/* <PersonIcon className="usser" sx={{ fontSize: 50 }}></PersonIcon> */}
          <p className='fnh'></p>
          {/* <VerifiedIcon></VerifiedIcon> */}
          <p className="fem"></p>
        </div>
        <div>
          <img src={tweet} alt="" className="tweetimg" />
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="Trends">
        <SignupBar></SignupBar>
      </div>
      <div className="lastfoo">
        <footer>
          <h2 className='lastftext'>Dont Miss What Happeining</h2>
        </footer>
      </div>
    </div>
  )
}





export default MainPage