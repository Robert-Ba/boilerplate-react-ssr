import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.css';

const Header = () => (
  <div className="header-component">
    <div>
      <h1>
        <Link to="/" className="nav-logo">
          Home
        </Link>
      </h1>
    </div>
    <div>
      <nav aria-label="Primary" role="navigation">
        <NavLink to="/login" className="nav-button" activeClassName="active">
          Login
        </NavLink>
      </nav>
    </div>

  </div>
);

export default Header;
