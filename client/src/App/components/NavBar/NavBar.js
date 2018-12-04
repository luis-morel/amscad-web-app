import React from 'react';
import "./NavBar.css"; // Styling
import Logo from "./Logo.json"; // AMS CAD Logo

const NavBar = () => {

  return (

    <nav className="navbar navbar-expand-lg" >

      < div className="navBarCoHeader" >
        <img id="navBarLogoText" src={Logo[0].imageUrl} alt={Logo[0].name} />
      </div >

      <div className="navBarAppHeader">
        <h3 id="navBarAppText">Facilities Management System</h3>
      </div>

    </nav >

  ); // End of return()

}; // End of NavBar()

export default NavBar;