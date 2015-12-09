/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <header>
        <div className="parallax">
          <img className="parallax-layer parallax-layer-base" src={require('./headerbg-back.jpg')} />
          <img className="parallax-layer parallax-layer-one" src={require('./headerbg-middle.png')} />
          <img className="parallax-layer parallax-layer-two" src={require('./headerbg-front.png')} />
        </div>
        <div className="header-logo">
          <span className="logo"></span>
          <h1 className="mainHeader">OBSERVATORY</h1>
        </div>
      </header>
    );
  }

}

export default Header;
