/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client'
import styles from './ObservablesPage.scss';
import withStyles from '../../decorators/withStyles';
import http from '../../core/HttpClient';

@withStyles(styles)
class ObservablesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      observables: [],
    }
  }

  componentDidMount() {
    let socket = io.connect();
    socket.on('observe', (response) => {
      this.setState({
        observables: response.observables
      });
    });
  }

  render() {
    return (
      <div className="container">
        <section>
        	<table id="versionTable" className="basic-table">
            <tbody>
            <tr>
            	<th className="center">Server</th>
              <th className="center">Environment</th>
            	<th className="center">Branch</th>
            	<th className="center">Commit Message</th>
              <th className="center">Commit Hash</th>
              <th className="center">Author</th>
              <th className="center">Commits since master</th>
              <th className="center">Last Deployment</th>
            </tr>
            { this.state.observables.map((observable, i) =>
              <tr>
                <td className="center">{observable.server}</td>
                <td className="center">{observable.environment}</td>
                <td className="center">{observable.branch}</td>
                <td className="center">{observable.commit}</td>
                <td className="center">{observable.sha}</td>
                <td className="center">{observable.author}</td>
                <td className="center">{observable.since_master}</td>
                <td className="center">{observable.last_deploy}</td>
              </tr>
            )}
            </tbody>
         	</table>
        </section>
      </div>
    );
  }

}

export default ObservablesPage;
