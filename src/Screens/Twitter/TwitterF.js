import '../../Styles/Index.css';
// import Following from './Following.jpg'
import Following from '../../Assets/Image/Following.jpg'
// import UserCalculatore from './UserCalculatore';
import UserCalculator from './UserCalculator';
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
import GifBoxIcon from '@mui/icons-material/GifBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClearIcon from '@mui/icons-material/Clear';
import BallotIcon from '@mui/icons-material/Ballot';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Trends from '../../components/TwitterComponents/Trends';
import React, { useState, useEffect } from 'react';
import { storage } from '../../config/firebase'
import { getDatabase, ref, set, push, child, get } from "firebase/database";
import { uid } from "uid";
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Get, GetById, Post } from '../../config/ApiMethods';
import axios from 'axios';
import usersapi from '../../config/config';

const style = {

    boxShadow: 24,
    p: 4,
};

function TwitterF({ route, navigation }) {
    // All Use States
    const [imagePreview, setImagePreview] = useState("");
    const [apidata, setApiData] = useState({})
    const [open, setOpen] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [tweet, setTweet] = useState("");
    const [lodd, setLodd] = useState(false)
    const [alltweet, setAllTweet] = useState([])
    const [birdsign, setBirdSign] = useState(false)
    const mOpen = () => setOpen(true);
    const mClose = () => setOpen(false);
    let ID = localStorage.getItem("id")


    setInterval(() => {
        setBirdSign(true)
    }, 3000);
    const handleLike = () => {

    }
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


    const handleOpen = () => {
        setSidebarOpen(true);
    };

    const getuserinfobyid = async () => {
        console.log("ID", ID)
    }
    useEffect(() => {
        getuserinfobyid()

    }, [])


    const handleClose = () => {
        setSidebarOpen(false);
    };

    const navigate = useNavigate();
    // let ID = localStorage.getItem("")
    // console.log(ID)
    const dbRef = ref(getDatabase());


    const handletextchange = (e) => {

        setTweet(e.target.value)
    }
    function Getdata() {
        Get('/post').then((res) => {
            console.log(res.data.data)
            setAllTweet(res.data.data)
        }).catch((e) => {
            console.log(e)
        })
    }
    useEffect(() => {
        Getdata();
    }
        , [])
    // Getdata()
    function Signout() {

        const auth = getAuth();
        signOut(auth).then(() => {
            navigate("/")
            alert("Sign-out successful.")
            // Navigate("/login")
        }).catch((error) => {
            alert(error)
        });

    }
    const writeUserData = async () => {
        try {
            setLodd(true)
            let url = "";
            if (imageUpload) {
                const imageRef = storageRef(storage, `posts/${new Date().getTime()}`);
                await uploadBytes(imageRef, imageUpload);
                const downloadURL = await getDownloadURL(imageRef);
                console.log('downloadURL', downloadURL);
                url = downloadURL;
            }

            const tweetdata = {
                description: tweet,
                createdBy: apidata.fullname,
                userProfile: apidata.profilepic,
                userid: apidata._id
            };

            if (url) {
                console.log("url", url)
                tweetdata.postImage = url;
            }
            Post('/post', tweetdata).then((res) => {
                console.log("data uploaded", res)
                setLodd(false)
                setImageUpload(null)
                setTweet("")
            }).catch((e) => {
                console.log(e)
            })
            console.log('tweetdata', tweetdata);

        } catch (e) {
            setLodd(false)
            console.log("error", e)
        }
    }
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
        <>
            {birdsign ? <>
                <div className="Container">

                    <div className="ls d-none ">
                        <div className="lf">
                            <div className="white-logo">

                                <h2 className='sidhead'>Acount Info</h2>
                            </div>
                            <div className="lkf">

                                {/* <HomeIcon className="ll"></HomeIcon>
<p className="lt">Home</p> */}
                                <img className=" avatar " onClick={allass} src={apidata.profilepic} />
                            </div>
                            <div className="lkf">

                                {/* <TagIcon className='link-icon'></
TagIcon>
<p className="lt">Explore</p> */}
                                <p className='fnh mt-3 sidname '>asdasd</p>

                            </div>
                            <div className="lkf">
                                <p className='fnh  sidusername '>{apidata.userName}</p>
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
                                <ExitToAppIcon className='ll' />
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
                                <p className="link-text" >Get Tweets</p>
                            </div>

                            <div className="link-flex">
                                <ExitToAppIcon className='link-icon' />
                                <p className="link-text" onClick={Signout}>SignOut</p>

                            </div>
                            {/* <div className="feather hspd">
<HistoryEduIcon sx={{fontSize:40}} className="bg-info rounded-circle feather"/> 
       
    </div> */}

                        </div>

                    </div>
                    {/* middle site */}
                    <div className="Middles post-sidersc ">
                        <div className="white-logo resptw ">
                            <a href="#">
                                {/* <PersonIcon variant="h1" className="twitter-white-logo "></PersonIcon> */}
                                <img className="Ppic avatar" onClick={handleOpen} sx={{ fontSize: 50 }} src={apidata.imageUrl} ></img>
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
                                                    <img className=" avatar " onClick={allass} src={apidata.imageUrl} />
                                                </div>
                                                <div className="lkf">

                                                    {/* <TagIcon className='link-icon'></
TagIcon>
<p className="lt">Explore</p> */}
                                                    <p className='fnh mt-3 sidname '>{apidata.fullname}</p>

                                                </div>
                                                <div className="lkf">
                                                    <p className='fnh  sidusername '>{apidata.userName}</p>
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
                                                    <ExitToAppIcon className='ll' />
                                                    <p className="lt" onClick={Signout}>SignOut</p>

                                                </div>

                                            </div>

                                        </div>

                                    </>
                                )}
                            </a>
                            <a href="#">
                                <TwitterIcon variant="h1" className="link-icon birdd"></TwitterIcon>
                            </a>
                        </div>
                        {/* <MiddleSite></MiddleSite> */}
                        <div className="Twhead">
                            <h1 className="Foy fs-5 mt-3 fw-bold  active">For you</h1>

                            <h1 className="Fos fs-5 mt-3 fw-bold" onClick={following}>Following</h1>
                        </div>

                        <hr />
                        <div className="haper">

                            <img className="PPic avatar maintweetph" onClick={allass} src={apidata.profilepic} />

                            <textarea cols="50" rows="1" className="Whh" name="" value={tweet} onChange={handletextchange} placeholder="What's Happening..">
                            </textarea>
                        </div>
                        {imagePreview && <img src={imagePreview} className="tweetimg " />}
                        <br />

                        {/* <hr className="hr" /> */}
                        <div className="alfunc">
                            <br />
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event) => { setImageUpload(event.target.files[0]) }} className="dmp">
                                    <input hidden accept="image/*" type="file" onChange={(event) => {
                                        setImageUpload(event.target.files[0]);
                                        setImagePreview(URL.createObjectURL(event.target.files[0]));
                                    }} />
                                    <PhotoCamera />
                                </IconButton>
                            </Stack>
                            {/* {imagePreview && <img src={imagePreview} />} */}

                            <GifBoxIcon></GifBoxIcon>
                            <BallotIcon></BallotIcon>
                            <CalendarTodayIcon></CalendarTodayIcon>
                            <button className="tbn" onClick={writeUserData} disabled={!tweet || lodd} >Tweet</button>
                        </div>
                        <Box>
                            <Typography className="text-primary"></Typography>
                        </Box>
                        <hr className='rts' />
                        <h3 className="totwets">Show {alltweet.length} Tweets</h3>
                        <hr />
                        {alltweet
                            .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                            .map((value) => {
                                // Rest of the code for rendering the tweets
                                return (
                                    <>
                                        <div className='' >
                                            <div className='w'>

                                                <div className="post-side">
                                                    <div className="feedss">
                                                        <img className="Ppic avatar" onClick={allass} sx={{ fontSize: 50 }} src={value.userProfile} ></img>
                                                        <p className='fnh mt-2 fs-6 font-monospace '>{value.createdBy}</p>

                                                    </div>
                                                    <p className="fem">{value.description}</p>
                                                    <p>{value.likes} likes </p>
                                                    {/* <FavoriteBorderIcon style={{ cursor: "pointer" }} onClick={() => handleLike(value)} disabled={isLiked} className="fgeah" /> */}


                                                    <div>
                                                        {value.postImage &&
                                                            (
                                                                <>
                                                                    <img src={`${value.postImage}?date=${new Date().getTime()}`} alt="Tweet Image" className="tweetimg " />



                                                                </>
                                                            )
                                                        }
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                );
                            })}

                        <footer>
                            <div className="">
                                <Box classNam="fade">
                                    <HistoryEduIcon sx={{ fontSize: 60 }} onClick={mOpen} id="fade" className="stickmsge rounded-circle " />
                                </Box>
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

                                                <img className=" avatar maintweetph" onClick={allass} src={apidata.profilepic} />
                                                <textarea type="text" className='inapa' placeholder="What's Happening" value={tweet} onChange={handletextchange} />
                                                <img src={imageUpload} alt="" />
                                            </div>

                                        </Stack>
                                        <hr />
                                        <div className="postw">
                                            <br />
                                            <Stack direction="row" alignItems="center" spacing={0}>
                                                <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event) => { setImageUpload(event.target.files[0]) }}>
                                                    <input hidden accept="image/*" type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                                    <PhotoCamera className='camera' />
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
                        <UserCalculator></UserCalculator>
                        <Trends></Trends>
                    </div>
                </div>
            </> : <>

                <TwitterIcon variant="h1" className="loaderlogo" fontSize='large' sx={{
                    width: "300",
                    display: 'flex',
                    justifyContent: 'center'
                }} ></TwitterIcon>
            </>}

        </>
    );
}

export default TwitterF;
