
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


function App() {
  return (
    <div className="App">
      <MiddleSite></MiddleSite>
      {/* middle site */}
      {/* <div className="middle-site">
      <h1 className="mhead">Home</h1>
      </div> */}
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
      </div>
      
</div>
{/* middle site */}

    
      </div>
  );
}

export default App;
