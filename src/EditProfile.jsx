import { Box ,Typography,Button,Stack,IconButton} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {React,useEffect,useState} from 'react'
import { uploadBytes,ref as storageRef , getDownloadURL} from 'firebase/storage';
import {storage} from './firebase'
import './App.css'

import { getDatabase, ref, child, get , update , push, set } from "firebase/database";
function EditProfile({setmodal}) {
  const [imageUpload,setImageUpload]=useState(null);
  const [name , setName] = useState("");
  const [bio , setbio] = useState("");
  const [contact , setcontact] = useState("");
    const [myObject,setMyObject] = useState({
        contactNumber:"",
        email:"",
        fullName:"",
        imageUrl:"",
        username:""
      })
      const db = getDatabase();
    const dbRef = ref(getDatabase());
let ID = localStorage.getItem("id")
    function Getdata(){
    
        get(child(dbRef, `user/${ID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // alert("data received")
            // console.log(snapshot.val());
            var obj = {
              contactNumber:snapshot.val().contactNumber,
              email:snapshot.val().email,
              fullName:snapshot.val().fullName,
              imageUrl:snapshot.val().imageUrl,
              username:snapshot.val().username,
              bio:snapshot.val().bio
            }
            setMyObject(obj)
            setcontact(obj.contactNumber)
            setName(obj.fullName)
            setbio(obj.bio)
            // console.log(obj);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
          alert("data not received")
        });}
    
      //  useEffect = () =>{
      //   Getdata()
      //  }
  useEffect(() => {
    Getdata()
      },[])
  const inputevent = (event)=>{
       console.log(event.target.value)
       setName(event.target.value)
        }
  const contactevent = (event)=>{
       console.log(event.target.value)
       setcontact(event.target.value)
        }
  const bioevent = (event)=>{
       console.log(event.target.value)
       setbio(event.target.value)
        }
  const onSubmit = (event)=>{
          // event.preventDefault();
          alert("Form Sumbitted")
          const imageRef = storageRef(storage,`images/${imageUpload  }`)
          uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            getDownloadURL(storageRef(storage,`images/${imageUpload  }` ))
            .then((url) => {
              console.log(url)
              push(ref(db, `user/${ID}`), {
                fullName:name,
                contactNumber:contact,
                bio:bio,
                imageUrl:url
              }).then(()=>{
                alert("Data Updated")
              }).catch((error)=>{
                alert("Data error" + error)
              })

      })
      .catch((error) => {
        // Handle any errors
      });
    
          console.log(snapshot)
              
        })
        
        }
  return (
    <Box className="backshadow">
        <Box className="custom-modal">
            <Box className="top-sec">
            {/* <Box className="delete-icon" onClick={()=>setmodal(false)}>X</Box> */}
            <ClearIcon onClick={()=>setmodal(false)} className="dele"></ClearIcon>
            <Typography className="fs-3">Edit Profile</Typography>
            <Button variant="filled" onClick={onSubmit}>Save</Button>
            
            </Box>
            <Box >
            <img
          className="EditPic mt-5"
          // src="https://picsum.photos/200"
          src={myObject.imageUrl}
          alt="profile avatar"
        />
        <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton color="primary" aria-label="upload picture" component="label" onChange={(event)=>{setImageUpload(event.target.files[0])}}>
        <input hidden type="file"  onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
        <PhotoCamera />
      </IconButton>
    </Stack>
         {/* <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}} /> */}
            </Box>
            <label>Name:</label>
            <input type="text" className='editinp' placeholder='Name' onChange={inputevent} value={name} name='name'/>
            {/* <input type="text" className='editinp' placeholder='Name' onChange={inputevent} value={name} name='name'/> */}
            <br />
            <label>Contact:</label>
            <input type="number" className='editinp' placeholder='Contact' value={contact} onChange={contactevent}/>
            <br />
            <label>Status:</label>
            <input type="text" className='editinp' placeholder='Bio' value={bio} onChange={bioevent}/>
        </Box>
    </Box>
  )
}

export default EditProfile