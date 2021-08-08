import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import React,{useState,useEffect} from "react";
import axios from 'axios'



export default function WidgetSm() {

    const [newusers, setNewUsers]  = useState([])

useEffect(() =>{
      const getUsers = async () =>{
        try {
          const res = await axios.get(`/user?new=true`,{
            headers : {
                token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc5NTI0M2JmY2ExMGZmMDU3ODJhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjkyNjc4MSwiZXhwIjoxNjI3MDEzMTgxfQ.NJhgXojVTcXWdehUOetA8uL3kWhWiF7jh9hmzV4jkN8"
            },
        })
         console.log(res)
         setNewUsers(res.data)
                   
        } catch (err) {
            console.log(err)
        }
      
      }
      getUsers();
  },[]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
            newusers.map(user =>(
              <li className="widgetSmListItem">
                <img
                  src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                  alt="avataar"
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                  
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                   Display
                </button>
            </li>
            
            ))
        }
        
       
      </ul>
    </div>
  );
}
