import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage } from "../../config/firebase";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../config/firebase";
import styles from "./Signup.module.css";
import { getDatabase, ref, set, push } from "firebase/database";
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';
function Signup(url) { 
  
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [tweet, setTweet] = useState("");
  const CreateUser=()=>{}
  const imageUploading= async ()=>{
    alert("Hello")
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
        navigate("/Home");
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
        alert("Your Acc Is Created")
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
      alert("Image Uploaded")

    })
  }}
  const handletextchange = (e) => {
    setTweet(e.target.value)
  }



  const handleSubmission = async () => {
    // if (!values.name || !values.email || !values.pass) {
    //   setErrorMsg("Fill all fields");
    //   return;
    // }
    
    // setErrorMsg("");
    // setSubmitButtonDisabled(true);
    // createUserWithEmailAndPassword(auth, values.email, values.pass)
    //   .then(async (success) => {
    //     navigate("/Home");
    //     const url = await imageUploading();
    //     console.log(url)
    //     console.log(success.user.uid)
    //     setSubmitButtonDisabled(false);
    //     const user = success.user;
        // await updateProfile(user, {
        //   displayName: values.name
        // });
    //     //       const db = getDatabase();
    //     //   push(ref(db, `${props.name}`), {
    //     //     username: tweet,
    //     //   });
    //     //   alert("Your Tweet Has Been Sended")
    //     // }
    //     const db = getDatabase();
    //     set(ref(db, `user/${success.user.uid}`), {
    //       username: values.name,
    //       email: values.email,
    //       // password:values.password,
    //       ContactNumber: values.ContactNumber,
    //       FullName: values.FullName,
    //       // ImageUrl:ImgUrl
    //     });
    //     alert("Your Acc Is Created")
    //     handletextchange();
    //   })
    //   .catch((err) => {
    //     setSubmitButtonDisabled(false);
    //     setErrorMsg(err.message);
    //   });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))}
          label="Name"
          placeholder="Enter your name"
          
        />
        <InputControl
          value={values.email}
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          // value={values.password}
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <InputControl
          value={values.ContactNumber}
          label="Contact Number"
          placeholder="Contact Number"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, ContactNumber: event.target.value }))
          }
        />
        <InputControl
          value={values.FullName}
          label="FullName"
          placeholder="Full Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, FullName: event.target.value }))
          }
        />
        <InputControl type="file"
          label="Profile Image"
          placeholder="Profile Image"
          // onChange={(event) =>
          //   setValues((prev) => ({ ...prev, name: event.target.value }))
          // }
          onChange={(event)=>{setImageUpload(event.target.files[0])}}
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={imageUploading} disabled={submitButtonDisabled}>
            Signup
            {/* onClick={handleSubmission} */}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
