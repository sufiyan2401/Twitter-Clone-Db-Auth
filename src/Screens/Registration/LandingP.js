import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../../Styles/Main.css'
import '../../Styles/Index.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storage } from '../../config/firebase';
import { auth } from '../../config/firebase';
import styles from '../../components/Signup/Signup.module.css'
import { getDatabase, ref, set, push } from "firebase/database";
import LinearProgress from '@mui/material/LinearProgress';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { InputLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import { Post } from '../../config/ApiMethods';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 240,
    height: 700,
    pt: 2,
    px: 4,
    pb: 3,

};

function LandingP() {
    const [circle, setCircle] = useState(false)
    const [loader, setLoader] = useState(false)
    function fetse() {
        setCircle(true)
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const navigate = useNavigate();
    const [Loginvalues, setLoginValues] = useState({
    });
    const [values, setValues] = useState({

    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [tweet, setTweet] = useState("");
    const handleSubmission = () => {
        console.log(Loginvalues)
        try {
            Post('/user/login', Loginvalues)

                .then(res => {
                    console.log(res)
                    const userinfo = res.data.data
                    let id = localStorage.setItem('id', res.data.data._id);
                    console.log(id, "locals")
                    navigate("/Home")

                    // navigate("/Home", {
                    // });
                }).catch(e => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    };
    const imageUploading = async () => {
        let imageUrl = "";
        if (imageUpload == null) { return }
        const imageRef = storageRef(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(storageRef(storage, `images/${imageUpload.name}`))
                .then((url) => {
                    imageUrl = url;
                    console.log(imageUrl)
                    const temp = {
                        userName: values.userName,
                        email: values.email,
                        password: values.password,
                        fullname: values.fullname,
                        contactnum: values.fullname,
                        profilepic: imageUrl
                    }
                    console.log("userinfo", temp)
                    try {
                        setLoader(true)
                        Post('/user/signup', temp)
                            .then(res => {
                                console.log(res)
                            }).catch(e => {
                                console.log(e)
                            })
                    } catch (e) {
                        console.log(e)
                        setLoader(false)
                    }
                    // setImage(imageUrl)
                }) 
        })
        console.log(values)

    }
    const handletextchange = (e) => {
        setTweet(e.target.value)
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [open, setOpen] = React.useState(false);
    const [Login, setLogin] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const LoginOpen = () => {
        setLogin(true);
    };
    const LoginClose = () => {
        setLogin(false);
    };

    return (
        <div className="container d-flex justify-content-evenly">
            {/* {circle? 
          <CircularProgress disableShrink />
          :""
          } */}
            <div className="image">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="big-bird">
                    <g>
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">

                        </path>
                    </g>
                </svg>
            </div>

            <div className="content">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="small-bird">
                    <g>
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">

                        </path>
                    </g>
                </svg>

                <h1 className="MainHapen">Happening now</h1>
                <h3 className="Join">Join Twitter today.</h3>

                <div className="button ">
                    <React.Fragment>
                        <a href="#" className="btn btn-signup" onClick={handleOpen}>Sign up</a>
                        <Modal
                            className="Moboc"
                            hideBackdrop
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style, width: 700 }} className="modalbox bg-dark">
                                {circle ?
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box> : ""
                                }
                                <h1 onClick={handleClose} className="clodebtn "  >X</h1>
                                <h1 className="CreateAccHead"> Create Your Acount</h1>
                                <Box className="MainInpFields"

                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {/* <TextField id="-basic" label="Outlined " variant="outlined" className="inpfieldsig text-light" /> */}
                                    {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Name</InputLabel> */}
                                    <input type="text" id="inputField" placeholder="Name" className='bg-dark' value={values.name}
                                        onChange={(event) =>
                                            setValues((prev) => ({ ...prev, userName: event.target.value }))} />

                                    {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Email</InputLabel> */}
                                    <input type="text" id="inputField" placeholder="Email" className='bg-dark' disabled={loader} value={values.email} onChange={(event) =>
                                        setValues((prev) => ({ ...prev, email: event.target.value }))
                                    } />

                                    <FormControl sx={{ m: 1, }} >
                                        <Input
                                            id="inputField"
                                            disabled={loader}
                                            className="Passty"
                                            placeholder='Password'
                                            onChange={(event) =>
                                                setValues((prev) => ({ ...prev, password: event.target.value }))
                                            }
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                    <input type="text" id="inputField" placeholder="Full Name" className='bg-dark' value={values.FullName} disabled={loader} onChange={(event) =>
                                        setValues((prev) => ({ ...prev, fullname: event.target.value }))
                                    } />
                                    <input type="Number" id="inputField" placeholder="Contact Number" className='bg-dark' disabled={loader} value={values.ContactNumber} onChange={(event) =>
                                        setValues((prev) => ({ ...prev, contactnum: event.target.value }))
                                    } />
                                    <Stack direction="row" alignItems="center" spacing={2} disabled={loader}>
                                        <Button variant="contained" component="label">
                                            Upload Your Profile Pic
                                            <input hidden accept="image/*" multiple type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                        </Button>
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                            <PhotoCamera />
                                        </IconButton>
                                    </Stack>

                                </Box>
                                <b className={styles.error}>{errorMsg}</b>
                                <Stack direction="row" spacing={2} className="d-flex justify-content-center mt-5">
                                    <Button variant="contained" endIcon={<PersonIcon />} onClick={imageUploading} disabled={submitButtonDisabled}>
                                        Sign Up
                                    </Button>
                                    {circle ?
                                        <Box className="loadersd">
                                            <CircularProgress className="heal" />
                                        </Box> : ""
                                    }


                                </Stack>
                            </Box>

                        </Modal>

                    </React.Fragment>
                    <React.Fragment>
                        <a href="#" className="btn btn-login" onClick={LoginOpen}>Login</a>
                        <Modal
                            className="Login Moboc"
                            hideBackdrop
                            open={Login}
                            onClose={LoginClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >

                            <Box sx={{ ...style, width: 700 }} className="modalbox bg-dark">
                                {circle ?
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress />
                                    </Box> : ""
                                }
                                <h1 onClick={LoginClose} className="clodebtn "  >X</h1>
                                <h1 className="CreateAccHead"> Login Your Acount</h1>
                                <Box className="MainInpFields"

                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {/* <TextField id="-basic" label="Outlined " variant="outlined" className="inpfieldsig text-light" /> */}
                                    {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Name</InputLabel> */}
                                    {/* <input type="text" id="inputField" placeholder="Name" className='bg-dark'  value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))}/> */}

                                    {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Email</InputLabel> */}
                                    {/* {circle? 
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>:""
          } */}
                                    <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" > Email</InputLabel>
                                    <input type="text" id="inputField" placeholder="Email" className='bg-dark' onChange={(event) =>
                                        setLoginValues((prev) => ({ ...prev, email: event.target.value }))
                                    } />

                                    <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Password</InputLabel>
                                    <FormControl sx={{ m: 1, }} >
                                        <Input
                                            id="inputField"
                                            className="Passty"
                                            placeholder='Password'
                                            onChange={(event) =>
                                                setLoginValues((prev) => ({ ...prev, password: event.target.value }))
                                            }
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>



                                </Box>
                                <b className={styles.error}>{errorMsg}</b>
                                <Stack direction="row" spacing={2} className="d-flex justify-content-center mt-5">
                                    <Button variant="contained" endIcon={<PersonIcon />} onClick={handleSubmission} disabled={submitButtonDisabled}>
                                        Sign In
                                    </Button>
                                    {circle ?
                                        <Box className="loadersd">
                                            <CircularProgress className="heal" />
                                        </Box> : ""
                                    }
                                </Stack>
                            </Box>

                        </Modal>

                    </React.Fragment>
                    {/* <a href="#" className="btn btn-login">Log in</a> */}
                </div>
            </div>

        </div>

    )
}

export default LandingP