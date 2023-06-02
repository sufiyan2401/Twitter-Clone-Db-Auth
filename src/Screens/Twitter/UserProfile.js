import '../../Styles/Index.css';
import trends from '@mui/icons-material/Twitter';
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
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import GifBoxIcon from '@mui/icons-material/GifBox';
import BallotIcon from '@mui/icons-material/Ballot';
import { getAuth, signOut } from "firebase/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom'
import tweet from '../../Assets/Image/tweet.jpg'
import EditProfile from './EditProfile';
import { Box } from '@mui/system';
// import Trends from './Trends'
import { Link } from 'react-router-dom'
import UserCalculator from './UserCalculator';
import Trends from '../../components/TwitterComponents/Trends';
// import { ref, set, get, update, remove, child } from 'firebase/database'
import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect, useState } from 'react';
import { GetById } from '../../config/ApiMethods';
import axios from 'axios';
import usersapi from '../../config/config';
const dbRef = ref(getDatabase());
let ID = localStorage.getItem("id")
function UserProfile(props) {
    console.log("ID", ID)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function seeprofile() {
        navigate("/editprofile")
    }
    const handleOpen = () => {
        setSidebarOpen(true);
    };



    const handleClose = () => {
        setSidebarOpen(false);
    };
    const [myObject, setMyObject] = useState({
        contactNumber: "",
        email: "",
        fullName: "",
        imageUrl: "",
        username: "",
        bio: "",
        following: "",
        followers: "",
    })
    const [myTweets, setMyTweets] = useState({
        Tweets: "",

    })
    const [apidata, setApiData] = useState({})
    const [modal, setmodal] = useState(false)
    const getuserinfo = async () => {
        try {
            const response = await axios.get(`${usersapi}/${ID}`);
            const user = response.data;
            console.log(user.data);
            setApiData(user.data)
            // Do something with the user data
        } catch (error) {
            console.error(error);
            // Handle the error
        }
    }
    useEffect(() => {
        getuserinfo();
    }, [])
    const getweets = () => {
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
            // alert("data not received")
        });
    }
    useEffect(() => {
        // getweets()

    }, []);


    function Getdata() {


        get(child(dbRef, `user/${ID}`))
            .then((snapshot) => {
                if (snapshot.exists()) {

                    var obj = {
                        contactNumber: snapshot.val().contactNumber,
                        email: snapshot.val().email,
                        fullName: snapshot.val().fullName,
                        imageUrl: snapshot.val().imageUrl,
                        username: snapshot.val().username,
                        bio: snapshot.val().bio,
                        following: snapshot.val().following,
                        followers: snapshot.val().followers,
                    }
                    setMyObject(obj)
                    console.log(obj.following.length);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
                // alert("data not received")
            });
    }
    useEffect(() => {

        // Getdata()
    }, [])
    var person = document.getElementById("whidd")
    const navigate = useNavigate();

    function allass() {
        navigate("/");
    }
    function back() {
        navigate("/Home")
    }
    function profile() {
        navigate("/MyAcount")
    }
    const toogleModal = () => {

    }
    function Signout() {

        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/")
            alert("Sign-out successful.")
            // Navigate("/login")
        }).catch((error) => {
            // alert(error)
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
                        <ExitToAppIcon className='link-icon' />
                        <p className="link-text" onClick={Signout}>SignOut</p>
                        {/* <PersonIcon className='link-icon' onClick={allass}></PersonIcon> */}
                        {/* <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                        {/* <p className='mt-3 fs-4 font-monospace'>{props.name ? ` ${props.name}` : ""}</p> */}
                    </div>
                </div>

            </div>
            {/* middle site */}
            <div className="Middles pmid scrolling">

                <Box className="d-flex topsec">
                    <ArrowBackIcon onClick={back} className="fs-3 mt-2"></ArrowBackIcon>
                    <h1 className="username"><p className='mt-2 fs-4'>{apidata.fullname}</p></h1>
                </Box>
                <Box>
                    <Box className='bigpro'>
                        <Box className="d-flex twdsa">
                            <img
                                className="avatar iapia"
                                // src="https://picsum.photos/200"
                                src={apidata.profilepic}
                                alt="profile avatar"
                            />

                            <button className="ediban fs-6  rounded-pill" onClick={() => setmodal(true)} setmodal={setmodal}>Edit Profile</button>
                            {/* <button className='bg-info text-white border border-info-subtle rounded-pill ediban'onClick={()=>setmodal(true)} setmodal={setmodal}>Edit Profile</button> */}
                            {modal == true && (
                                <EditProfile setmodal={setmodal} />
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box className="mainan">
                    <h1 className="username"><p className='mt-3 fs-4 font-monospace'>{apidata.fullname}</p></h1>
                    <h1 className="username ateh"><p className='  fs-6 '>@{apidata.userName}</p></h1>
                    <h1 className="username "><p className='  fs-6 '>{myObject.bio}</p></h1>
                    <Box className="d-flex heica">
                        <h1 className="username "><p className='  fs-6 '>{myObject.following.length}Following</p></h1>
                        <h1 className="username "><p className='  fs-6 '>{myObject.followers.length}Followers</p></h1>
                    </Box>
                </Box>
                <hr />
                <Box>
                    <Typography className="csa">Tweets</Typography>
                    <div className='bg-info linepa'></div>
                    <hr />
                </Box>
                <Box className="flowi">
                    {Object.values(myTweets).map((value) => {
                        // console.log(value)
                        return (
                            <>
                                <div className="feedss">
                                    <img className="Ppic avatar" onClick={allass} sx={{ fontSize: 50 }} src={myObject.imageUrl} ></img>
                                    {/* <p className='fnh mt-3 fs-4 font-monospace '>{props.name ? ` ${props.name}` : ""}</p> */}
                                    <p className='fnh fs-4 '>{myObject.fullName}</p>
                                    {/* <VerifiedIcon></VerifiedIcon> */}
                                    {/* <p className="fem">@{myObject.username}</p> */}
                                    {/* <p className="fem">@{props.name ? ` ${props.name}` : ""}</p> */}
                                </div>
                                <p className="fem">{value.Tweets}</p>
                                <div>

                                    {value.url &&
                                        (
                                            <>
                                                <img src={value.url} alt="Tweet Image" className="tweetimg " />



                                            </>
                                        )
                                    }
                                    <hr />
                                    {/* <p>{myObject.Tweets}</p> */}
                                    {/* <img src={Following} alt="" className="tweetimg" /> */}

                                </div>
                            </>
                        )
                    })}
                </Box>
                <hr />
                <Box>
                    <Typography variant="h5" className="fw-bold">Who To Follow</Typography>
                    <br />
                    <UserCalculator />
                </Box>
            </div>
            <div className="Trends">
                <Trends></Trends>
            </div>

        </div>
    );
}







export default UserProfile