import React,{useState, useEffect} from 'react'
import Featured from '../../components/Featured/Featured'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'

import './Home.scss'

const Home = ({type}) => {
    
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() =>{
        const getList = async () =>{
            const res = await axios.get(
                `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                {
                    headers : {
                        token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc5NTI0M2JmY2ExMGZmMDU3ODJhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjkyNjc4MSwiZXhwIjoxNjI3MDEzMTgxfQ.NJhgXojVTcXWdehUOetA8uL3kWhWiF7jh9hmzV4jkN8"
                    },
                }
                );
            console.log(res)
            setLists(res.data)
        }

        getList();
    },[type, genre]);

    return (
        <div className='home'>
               
               <Navbar/>
               <Featured type={type}/>

               {
                   lists.map((listitem)=>{

                        <List list={listitem}/>
                   })
               }
               
              
              
        </div>
    )
}

export default Home
