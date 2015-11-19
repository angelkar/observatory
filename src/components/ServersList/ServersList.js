/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client'
import styles from './ServersList.scss';
import withStyles from '../../decorators/withStyles';
import http from '../../core/HttpClient';

@withStyles(styles)
class ServersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servers: [],
    }
  }

  componentDidMount() {
    let socket = io.connect();
    socket.on('observe', (response) => {
      this.setState({
        servers: response.servers
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
            { this.state.servers.map((server, i) =>
              <tr>
                <td className="center">{server.server}</td>
                <td className="center">{server.environment}</td>
                <td className="center">{server.branch}</td>
                <td className="center">{server.commit}</td>
                <td className="center">{server.sha}</td>
                <td className="center">{server.author}</td>
                <td className="center">{server.since_master}</td>
                <td className="center">{server.last_deploy}</td>
              </tr>
            )}
            </tbody>
         	</table>
        </section>
      </div>
    );
  }

}

export default ServersList;
