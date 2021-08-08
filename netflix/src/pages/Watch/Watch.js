import React from 'react'
import './Watch.scss'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import {Link,useLocation} from 'react-router-dom'

const Watch = () => {
      const location = useLocation()
      const movie = location.movies
      console.log(location)
    return (
        <div className='watch'>
            <Link to='/'>

               <div className="back">
                 <ArrowBackOutlinedIcon/> 
                 Home
               </div>
            </Link>

             <video 
                className='video' 
                controls 
                autoPlay
                progress  
                src={movie.video}
              />  
        </div>
    )
}

export default Watch
