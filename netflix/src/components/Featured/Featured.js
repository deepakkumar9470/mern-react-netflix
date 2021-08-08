import React,{useState, useEffect} from 'react'
import './Featured.scss'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import axios from 'axios'

const Featured = ({type}) => {
    const [content,setContent] = useState([])

    useEffect(() =>{
        const getMovies= async () =>{
            const res = await axios.get(`movies/random?type=${type}`,
            {
                headers : {
                    token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc5NTI0M2JmY2ExMGZmMDU3ODJhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNjkyNjc4MSwiZXhwIjoxNjI3MDEzMTgxfQ.NJhgXojVTcXWdehUOetA8uL3kWhWiF7jh9hmzV4jkN8"
                },
            });
            console.log(res)
            setContent(res.data[0])
        }

        getMovies();
    },[type]);
console.log(content)
    return (
        <div className='featured'>
            {type && (
                <div className="category">
                    <span>{type === 'movies' ? 'Movies' : 'Series' }</span>
                    <select name="genre" id="genre">
                        <option>Genere</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentry">Documentry</option>
                        <option value="historical">Historical</option>
                    </select>
                </div>
            )}
             <img 
               src={content.img} alt="netliflix" />
             <div className="info">
                  
                 <img src={content.imgTitle} alt="matrix" />

                <span className='desc'>{content.desc}</span>

                  <div className="buttons">
                       <button className='play'>
                          <PlayArrowIcon/>
                           <span>Play</span>
                      </button>     
                     <button className='more'>
                         <InfoOutlinedIcon/>
                         <span>Info</span>
                    </button>     
                 </div>     
             </div>
            
        </div>
    )
}

export default Featured
