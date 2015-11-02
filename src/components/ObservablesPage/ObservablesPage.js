/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client'
import styles from './ObservablesPage.css';
import withStyles from '../../decorators/withStyles';
import http from '../../core/HttpClient';
import { servers } from '../../config';

@withStyles(styles)
class ObservablesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      observables: [],
    }
  }

  componentDidMount() {
    let socket = io.connect('http://localhost:8080');

    socket.on('welcome', (response) => {
      console.log('Initialized web socket connection');
    })

    socket.on('observe', (response) => {
      this.setState({
        observables: response.observables
      });
    });
  }

  render() {
    return (
      <div className="ObservablePage">
        <div className="ObservablePage-container">
          <table id="observableTable">
          <tbody>
            <tr>
            	<th>Environment</th>
            	<th>Branch</th>
            	<th>Last Commit</th>
            	<th>Author</th>
            	<th>Commits since master</th>
              <th>Last updated at</th>
            </tr>
            { this.state.observables.map((observable, i) =>
              <tr>
                <td>{observable.domain}</td>
                <td>{observable.branch}</td>
                <td>{observable.sha}</td>
                <td>{observable.author}</td>
                <td>{observable.count}</td>
                <td>{observable.updated_at}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default ObservablesPage;
