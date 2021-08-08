import React,{useState} from 'react'
import './Navbar.scss'
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isScrolled, setScrolled] = useState(false)

    window.onscroll = () =>{
        setScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null);
    }
    
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <img src="./images/logo.png" alt="logo" />  
                    
                    <Link to="/" className="link">
                        <span>Home</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span className="navbarmainLinks">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarmainLinks">Movies</span>
                    </Link>
                    
                    <span>New & Popular</span>
                    <span>My List</span>
                </div>

                <div className="right">
                      <SearchIcon className='icon'/>
                      <span>KID</span>
                      <NotificationsIcon className='icon'/>
                      <img 
                       src="./images/ppic.jpeg" 
                        alt="profilepic" />

                    <div className="profile">
                         <ArrowDropDownIcon className='icon'/>
                         <div className="options">
                             <span>Settings</span>
                             <span>Logout</span>
                         </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Navbar
