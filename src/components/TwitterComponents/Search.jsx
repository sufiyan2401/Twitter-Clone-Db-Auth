import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

function Search() {
    const[search,setSearch] = useState('')
    console.log(search)
  return (
    <>
    <br />
        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}
      className="bg-dark searinac rounded-pill"
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
      <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        className="plaee"
        placeholder="Search Twitter"
        inputProps={{ 'aria-label': 'search Twitter ' }}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </Paper>

    </>
  )
}

export default Search