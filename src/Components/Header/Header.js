import { withRouter, Link } from "react-router-dom";

const Header = (props) => {
  if (props.location.pathname === "/") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/auth">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/rentals">Rentals</Link>
          <Link to="/location">Location</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/auth") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/rentals">Rentals</Link>
          <Link to="/location">Location</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/rentals") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/location">Location</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/location") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/rentals">Rentals</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/contact") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/rentals">Rentals</Link>
          <Link to="/location">Location</Link>
        </nav>
      </header>
    );
  } else if (props.location.pathname === "/profile") {
    return (
      <header>
        <h1>Ridge Rentals</h1>
        <nav>
          <Link to="/rentals">Rentals</Link>
          <Link to="/location">Location</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </header>
    );
  }
};

export default withRouter(Header);
