
import { Box ,Typography,Button,Stack,IconButton} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {React,useEffect,useState} from 'react'
import { uploadBytes,ref as storageRef , getDownloadURL} from 'firebase/storage';
import {storage} from './firebase'
import './App.css'

import { getDatabase, ref, child, get , update , push, set } from "firebase/database";

function TotalUsers() {
    const [imageUpload,setImageUpload]=useState(null);
    const [name , setName] = useState("");
    const [bio , setbio] = useState("");
    const [contact , setcontact] = useState("");
    const [myObject,setMyObject] = useState([])
    function Getdata(){
        const dbRef = ref(getDatabase());
        get(child(dbRef, `user/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const allusers = []
            let users = (Object.values(snapshot.val()))
            Object.values(users).forEach((user,index)=>{
                console.log(user)
                
                var data ={
                  fullname :(user.fullName),
                  username : (user.username),
                  image: (user.imageUrl),
                  bio:(user.bio),
                }
                console.log(data.image)
                 allusers.push(data);
                 // setMyObject(data)
                })
                setMyObject(allusers)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
          alert("data not received")
        });
      }
        useEffect(() => {
            Getdata()
        },[])
  console.log('My Object: ', myObject);
    
    {/* <h1>Users</h1> */}
    return (
      <>
    {myObject.map((value)=>{
      return(
        <>
    <Box className="d-flex ads">
<img
      className=" PPic avatar "
      // src="https://picsum.photos/200"
      src={value.image}
      alt="profile avatar Ppic"
    />
    <button className="honuni rounded-pill">Follow</button>
    </Box>    
    <Typography variant="h6" className="fw-bolder">{value.fullname}</Typography>
    <Typography variant="outlined" className="cscg ">@{value.username}</Typography>
    <br />
    <p>{value.bio}</p>
    
        {/* <Box className="d-flex">
        <Box className="d-flex justify-co">
<img
      className=" PPic avatar "
      // src="https://picsum.photos/200"
      src={value.image}
      alt="profile avatar Ppic"
    />
    <Typography variant="h6" className="fw-bolder">{value.fullname}</Typography>
    </Box>
    <br />
    <Typography variant="outlined" className="cscg ">@{value.username}</Typography>
    <br />
    <p>{value.bio}</p>
    <button className="rounded-pill">Edit Profile</button>
    </Box> */}
        </>
      )
    })}
    </>
    )
    
}

export default TotalUsers