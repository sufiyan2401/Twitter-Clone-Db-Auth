import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Mainpg.css'
import './App.css'
// Firebase
// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storage } from './firebase';
// import InputControl from "../InputControl/InputControl";
import { auth } from "./firebase";
import styles from "../src/components/Signup/Signup.module.css";
import { getDatabase, ref, set, push } from "firebase/database";
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
// Firebase
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 240,
  height:700,
  pt: 2,
  px: 4,
  pb: 3,
  
};

function MainPg(url) {
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();
  const [Loginvalues, setLoginValues] = useState({
    email: "",
    pass: "",
  });
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [tweet, setTweet] = useState("");
  const handleSubmission = () => {
    if (!Loginvalues.email || !Loginvalues.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, Loginvalues.email, Loginvalues.pass)
      .then(async (success) => {
        setSubmitButtonDisabled(false);
        let fullid =(success.user.uid)
        let id = localStorage.setItem("id",fullid)
        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  const imageUploading= async ()=>{
    
    let imageUrl = "";
  if (imageUpload == null) { return }
  else {
    const imageRef = storageRef(storage, `images/${imageUpload.name}`)
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(storageRef(storage, `images/${imageUpload.name}`))
        .then((url) => {
          console.log(url)
           setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (success) => {
        // navigate("/login");
        handleClose();
        LoginOpen()
        console.log(success.user.uid)
        setSubmitButtonDisabled(false);
        const user = success.user;
        await updateProfile(user, {
          displayName: values.name
        });
        //       const db = getDatabase();
        //   push(ref(db, `${props.name}`), {
        //     username: tweet,
        //   });
        //   alert("Your Tweet Has Been Sended")
        // }
        const db = getDatabase();
        set(ref(db, `user/${success.user.uid}`), {
          username: values.name,
          email: values.email,
          // password:values.password,
          contactNumber: values.ContactNumber,
          fullName: values.FullName,
          imageUrl: url,
        });
        alert("Your Acc Is Created Plz Login Here ")

        // handletextchange();
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
          
        })
        .catch((error) => {
          // Handle any errors
        });

      console.log(snapshot)
      // alert("Image Uploaded")

    })
  }}
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
        <Box sx={{ ...style, width: 700  }} className="modalbox bg-dark">
          
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
      <input type="text" id="inputField" placeholder="Name" className='bg-dark'  value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))}/>

      {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Email</InputLabel> */}
      <input type="text" id="inputField" placeholder="Email" className='bg-dark' value={values.email}  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }/>

          {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Password</InputLabel> */}
      <FormControl sx={{ m: 1,  }} >
          <Input
          id="inputField"
          className="Passty"
          placeholder='Password'
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
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
        {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Full Name</InputLabel> */}
      <input type="text" id="inputField" placeholder="Full Name" className='bg-dark' value={values.FullName} onChange={(event) =>
            setValues((prev) => ({ ...prev, FullName: event.target.value }))
          }/>
        {/* <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Contact No</InputLabel> */}
      <input type="text" id="inputField" placeholder="Contact Number" className='bg-dark'  value={values.ContactNumber}  onChange={(event) =>
            setValues((prev) => ({ ...prev, ContactNumber: event.target.value }))
          } />
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        
        <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
      Upload Your Profile Pic
        <input hidden accept="image/*" multiple type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}} />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file"onChange={(event)=>{setImageUpload(event.target.files[0])}} />
        <PhotoCamera />
      </IconButton>
    </Stack>

            </Box>
    <b className={styles.error}>{errorMsg}</b>
    <Stack direction="row" spacing={2} className="d-flex justify-content-center mt-5">
      <Button variant="contained" endIcon={<PersonIcon />}  onClick={imageUploading} disabled={submitButtonDisabled}>
        Sign Up
      </Button>
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
        <Box sx={{ ...style, width: 700  }} className="modalbox bg-dark">
          
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
      <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" > Email</InputLabel>
      <input type="text" id="inputField" placeholder="Email" className='bg-dark'  onChange={(event) =>
            setLoginValues((prev) => ({ ...prev, email: event.target.value }))
          } />

          <InputLabel htmlFor="standard-adornment-password" className="inpfieldsig bg-dark text-light" >Password</InputLabel>
      <FormControl sx={{ m: 1,  }} >
          <Input
          id="inputField"
          className="Passty"
          placeholder='Password'
          onChange={(event) =>
            setLoginValues((prev) => ({ ...prev, pass: event.target.value }))
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
      <Button variant="contained" endIcon={<PersonIcon />}  onClick={handleSubmission} disabled={submitButtonDisabled}>
        Sign In
      </Button>
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

export default MainPg