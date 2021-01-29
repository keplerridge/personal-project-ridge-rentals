import { withRouter, Link } from "react-router-dom";
import logo from './backgroundridgelogo.png';
import './Header.css';

const Header = (props) => {
  if (props.location.pathname === "/") {
    return (
      <header>
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
  } else if (props.location.pathname === "/auth") {
    return (
      <header>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/rentals") {
    return (
      <header>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/location">Location</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/location") {
    return (
      <header>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/contact") {
    return (
      <header>
        <img onClick={() => props.history.push('/')} src={logo} alt='Mountains Logo'/>
        <h1>Ridge Rentals</h1>
        <nav className='nav'>
          <Link id='link' to="/profile">Profile</Link>
          <Link id='link' to="/rentals">Rentals</Link>
          <Link id='link' to="/location">Location</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/profile") {
    return (
      <header>
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
};

export default withRouter(Header);