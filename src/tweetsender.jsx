// import React from 'react'
// import StartFirebase from './components/firebaseConfig'
// import'./App.css'
// import {set,ref} from  "firebase/database"
// import { Box } from '@mui/material';
// // function tweetsender() {
//    {
//         constructor(props){
//             super(props)
//             this.state = {
//                  db:'',
//                  username:'',
//                 //  fullname:'',
//                 //  phonenumber:'',
//                 //  dob:'',
//             }
//         }
//         componentDidMount(){
//             this.setState({
//                 db:StartFirebase()
//             })
//         }
//         render(){
//             return(
//                 <>
//                      {/* <textarea cols="30" rows="1" className="Whh" ></textarea> */}
//                 {/* <label>Enter Username</label> */}
//                 <input type="text" id="userbox" value={this.state.username}
//                  onChange={e=>{this.setState({username: e.target.value});}} className="Whh" />
//                  <br />
//                  <button id="addBtn" onClick={this.interface}>Add Data</button>
//                  <button id="updateBtn" onClick={this.interface}>Delete Data</button>
//                  <button id="deleteBtn" onClick={this.interface}>Update Data</button>
//                  <button id="selectBtn" onClick={this.interface}>Get Data From Db</button>
//                 </>
//             )
//         }
//         interface (event){
//             const id = event.target.id

//             if(id=="addBtn"){
                
//                 this.insertdata();
//                 alert("Value Received")
                
//             }
//             else if(id=='updateBtn'){
//                 // this.updateData();
//             }
//             else if(id=='deleteBtn'){
//                 // this.deleteData();
//             }
//             else if(id=='selectBtn'){
//                 //this.selecttData();
//             }
//         }
//         getAllinput(){
//             return{
//                 username:this.state.username
//             }
//         }
//         insertdata(){
// const db = this.state.db;
// const data=this.getAllinput()
// set(ref(db,'tweets' + data.username),
// {
//     Fullname : data.username
// })
// .then((success)=>{
//     alert("Data Send Successfully" + success    )
// })       
// .catch((error)=>{
//     alert("There Was An Error " + error)
// })       
//         }
//     }
// // }

// // export default tweetsender
// // // return(
// // //     <Box>
// // //     <textarea cols="30" rows="1" className="Whh" ></textarea>
    
// // //     </Box>
// // )