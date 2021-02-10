import { useState } from "react"
import { withRouter, Link } from "react-router-dom";
import logo from './backgroundridgelogo.png';
import './MobileHeader.css';

const MobileHeader = props => {
    const [landing] = useState('/'),
        [auth] = useState('/auth'),
        [rentals] = useState('/rentals'),
        [location] = useState('/location'),
        [contact] = useState('/contact'),
        [profile] = useState('/profile'),
        [dropdown, setDropdown] = useState(false);

const toggleDropdown = () => {
    setDropdown(!dropdown);
}

let drop = dropdown;

if (props.location.pathname = landing) {
  if(drop = true){
    return(
        <header className='mobile-dropdown'>
          <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
          <h1>RIDGE RENTALS</h1>
          <div onClick={() => toggleDropdown()} className='dropdown'>Menu</div>
          <nav className='nav'>
            <Link id='link' to="/auth">Login</Link>
            <Link id='link' to="/profile">Profile</Link>
            <Link id='link' to="/rentals">Rentals</Link>
            <Link id='link' to="/location">Location</Link>
            <Link id='link' to="/contact">Contact Us</Link>
          </nav>
        </header>
        )
    } else {
      return null;
    }  
  } else if (props.location.pathname === auth) {
    if(drop = true){
      <header className='mobile-dropdown'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    } else {
      return null;
    }
  } else if (props.location.pathname === rentals) {
    if(drop = true){
      <header className='mobile-dropdown'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    } else {
      return null;
    }
  } else if (props.location.pathname === location) {
    if(drop = true){
      <header className='mobile-dropdown'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    } else {
      return null;
    }
  } else if (props.location.pathname === contact) {
    if(drop = true){
      <header className='mobile-dropdown'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
        </nav>
      </header>
    } else {
      return null;
    }
  } else if (props.location.pathname === profile) {
    if(drop = true){
      <header className='mobile-dropdown'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    } else {
      return null;
    }
  }
}

export default withRouter(MobileHeader);