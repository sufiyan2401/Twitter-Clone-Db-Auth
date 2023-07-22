
import { Box, Typography, Button, Stack, IconButton } from '@mui/material'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { React, useEffect, useState } from 'react'
import '../../Styles/Index.css'

import { getDatabase, ref, child, get, update, push, set } from "firebase/database";
import { Get } from '../../config/ApiMethods';

function UserCalculator() {
  let ID = localStorage.getItem("id")
  const [buttondisable, setButtondisable] = useState(false)
  const [folo, setFolo] = useState([])
  const [search, setSearch] = useState('')
  const [myObject, setMyObject] = useState([])
  const [myloggedin, setLoggedin] = useState([])
  const [following, setFollowing] = useState([])
  const [myval, setMyval] = useState('')
  const searchUser = () => {
    const searchedData = [];
    myObject.forEach((user) => {
      const result = user.fullname.toLowerCase().includes(search.toLowerCase());
      if (result) {
        searchedData.push(user);
      }
    })
    setMyObject([...searchedData]);
  }


  const userToFollow = (value) => {
    setButtondisable(true)
    let user = {}
    let user2 = {}
    console.log(folo, "pasafad")
    myObject.forEach((values) => {
      if (values.id === ID) {
        user = values;
      }
      if (values.id === value) {
        user2 = values
      }
      console.log(user)
      console.log(user2)
      const db = getDatabase();
      update(ref(db, `user/${value}`), {
        followers: ID
      });
      console.log(user2.followers, "uske followers:")
    })
    let uad = myObject.id
    let sad = user.following
    let checker = sad.includes(value)
    if (checker === true) {
      alert("User Already Exist")
      return;
      setButtondisable(false)
    } else if (checker === false) {
      console.log(sad, 'sdasd')
      console.log(uad, "uad")
      console.log('Loggedin User: ', user);
      console.log(value, "The User We Follow")
      console.log(value.followers, "The User We Follow")
      console.log(ID, "Myuid")
      const followings = [...user?.following, value];
      setFollowing(...[followings, ...following])
      const db = getDatabase();
      update(ref(db, `user/${ID}`), {
        following: followings,
      });
    }
  }

  function Getdata() {
    Get('/user').then((res) => {
      console.log("res.data.data", res.data)
      setMyObject(res.data)
      // setMyObject(res.data.data)
      // setAllTweet(res.data.data)
    }).catch((e) => {
      console.log(e)
    })
  }
  useEffect(() => {
    Getdata()
  }, [])
  function Getfollowers() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `user/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), "ids")
          const allusers = []
          let users = (Object.values(snapshot.val()))
          Object.values(users).forEach((user, index) => {
            console.log(user, "datafor folow ")

            var data = {
              fullname: (user.fullName),
              username: (user.username),
              image: (user.imageUrl),
              bio: (user.bio),
              id: (user.id),
              following: (user.following),
              followers: (user.followers)
            }

            console.log(data.id)
            console.log(data.following)
            setMyval(data.following)
            console.log(data.image)
            allusers.push(data);
          })
          setFolo(allusers)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
        alert("data not received")
      });
  }
  useEffect(() => {
    Getfollowers()
  }, [])
  {/* <h1>Users</h1> */ }
  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}
        className=" searinac rounded-pill"
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu" >
          <SearchIcon onClick={() => searchUser()} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          className="plaee"
          placeholder="Search Twitter"
          inputProps={{ 'aria-label': 'search Twitter ' }}
          onChange={(e) => setSearch(e.target.value)}
        />

      </Paper>

      {
        console.log("obj", myObject)
      }

      {myObject.map((value) => {
        if (value._id == ID) {
          // console.log(myval)
          return;
        } else { }

        return (
          <>

            <Box className="d-flex ads" diabled={!search}>
              <img
                className=" PPic avatar "
                // src="https://picsum.photos/200"
                src={value.profilepic}
                alt="profile avatar Ppic"
              />
              <button className="honuni rounded-pill"
              >Follow
              </button >
              {/* <button className="honuni rounded-pill"
                onClick={() => userToFollow(value.id)} disabled={myloggedin.following.includes(value.id)}>{myloggedin.following.includes(value.id) ? "Following" : "Follow"}
              </button > */}
            </Box>
            <Typography variant="h6" className="fw-bolder">{value.fullname}</Typography>
            <Typography variant="outlined" className="cscg ">@{value.userName}</Typography>
            <br />
            <p>{value.bio}</p>
          </>
        )
      })}
    </>
  )

}

export default UserCalculator