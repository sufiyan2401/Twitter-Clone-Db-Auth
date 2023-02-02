import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth,db} from "../../config/firebase"
// import {doc, setDoc } from 'firebase/firestore'
// import Error from '../error'
import { useNavigate } from 'react-router-dom';
import './App.css';
import styles from './App.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import Login from './Login';
import signu from './Signup.jpeg'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import twitter from './twitter'
// import { link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

function SignupBar() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
   const LoginRedirect =()=>{
    navigate("/Login")
   }
    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res, success) => {
                alert(res.user.uid)
                console.log(res.user.uid)
                // console.log(success.user,uid)
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });

                navigate("/Home");

            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
                console.log(err)
                alert("error" +  err)
            });
    };

    return (
        <div className='tends'>
            <div className="wpt">
                <h1 className='the'>New To twitter ?</h1>
                <p className='pti'>Sign up now to get your own personalized timeline!</p>
                {/* <img src={signu} alt="" /> */}
                <button className="sihe" id="myBtn">Create Acount</button>
                <div id="myModal" className="modal1">
                    <div className="modal-content1">
                        <span className="close1">&times;</span>
                        <Box className="Allinf">
                            <h1 className='font-monospace fs-2'> Create Your Acount</h1>
                            <br />
                            <br />
                            <Box className="mt-1 font-monospace">
                            {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                            <input type="text" name="" id="" placeholder="Name" className="sifield form-control form-control-lg" variant="outlined" onChange={(event) =>
                                setValues((prev) => ({ ...prev, name: event.target.value }))
                            }
                            />
                            <br />
                            
                            <input type="text" name="" id="" placeholder="Email" className="sifield form-control form-control-lg" onChange={(event) =>
                                setValues((prev) => ({ ...prev, email: event.target.value }))
                            }
                            />
                            <br />
                            
                            <input type="text" name="" id="" placeholder="Password" className="sifield form-control form-control-lg" onChange={(event) =>
                                setValues((prev) => ({ ...prev, pass: event.target.value }))
                            }
                            />
                            </Box>
                        </Box>
                        <br />
                        <br />
                        <br />
                        
                        <button onClick={handleSubmission} disabled={submitButtonDisabled} className="sihe fnfb">Signup Here ! </button>
                        <Typography>Already Have An Acount <button onClick={LoginRedirect}>Login Here</button></Typography>


                    </div>

                </div>
                <p>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>

            </div>

        </div>

    )




  
}




export default SignupBar