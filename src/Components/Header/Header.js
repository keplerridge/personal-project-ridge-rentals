import { withRouter, Link } from "react-router-dom";
import {useState} from 'react';
import logo from './backgroundridgelogo.png';
import './Header.css';

const Header = (props) => {
  const [landing] = useState('/'),
        [auth] = useState('/auth'),
        [rentals] = useState('/rentals'),
        [location] = useState('/location'),
        [contact] = useState('/contact'),
        [profile] = useState('/profile');

  if (props.location.pathname === landing) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>RIDGE RENTALS</h1>
        <nav className='nav'>
          <Link id='link' to="/auth">Login</Link>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === auth) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === rentals) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === location) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === contact) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === profile) {
    return (
      <header className='main-header'>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } 
}

export default withRouter(Header);