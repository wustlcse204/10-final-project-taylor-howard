import React from 'react';

import './Navbar.css';
import '../../utils.css';

export default function Navbar() {
  return (
    <nav id="header-nav">
      <div className="content-wrapper" id="header-content-wrapper">
        <h1 id="header-title" className="text title">
          Smash Bros.
        </h1>
      </div>
    </nav>
  );
}
