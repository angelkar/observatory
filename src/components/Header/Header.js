/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">Workable</span>
          </a>
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">Observatory</h1>
            <p className="Header-bannerDesc">A web server status monitor web app</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
