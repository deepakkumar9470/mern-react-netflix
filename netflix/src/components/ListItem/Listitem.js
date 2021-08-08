import React,{useState,useEffect} from 'react'
import './Listitem.scss'
import {PlayArrow,Add,ThumbDownAltOutlined, ThumbUpAltOutlined} from '@material-ui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Listitem = ({index,item}) => {
    const [movies,setMovies] = useState({})
    const [isHovered, setIsHovered] = useState(false)
    

    useEffect(() => {
        const getMovie = async () => {
          try {
            const res = await axios.get("movies/find/" + item, {
              headers: {
                token:
                "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc5NTI0M2JmY2ExMGZmMDU3ODJhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjkyNjc4MSwiZXhwIjoxNjI3MDEzMTgxfQ.NJhgXojVTcXWdehUOetA8uL3kWhWiF7jh9hmzV4jkN8"
              },
            });
            console.log(res)
            setMovies(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMovie();
      }, [item]);

    console.log(item)

    return (
        <Link to={{pathname : "/watch", movies : movies}}>
        <div className='listitem'
        style={{left : isHovered && index * 225 - 50 + index * 2.5}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave = {() => setIsHovered(false)}>
         
            <img src={movies.img} alt="listmovie" />
            
            {
                isHovered && (
                    <>
                    <video src={movies.trailer} autoPlay={true} loop />
                     <div className="iteminfo">
                        <div className="icons">
                            <PlayArrow className='icon'/>
                            <Add className='icon'/>
                            <ThumbUpAltOutlined className='icon'/>
                            <ThumbDownAltOutlined className='icon'/>
                        </div>
                        
                    <div className="iteminfotop">
                        <span>{movies.duration}</span>
                        <span className='limit'>+{movies.limit}</span>
                        <span>{movies.year}</span>
                    </div>
                    <div className="desc">
                        {movies.desc}
                    </div>

                    <div className="genere">{movies.genre}</div>
              </div>
                    </>
                )
            }

          
        </div>
                </Link>
    )
}

export default Listitem
