/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client';
import styles from './ServersList.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ServersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servers: [],
    };
  }

  componentDidMount() {
    const socket = io.connect();
    socket.on('observe', (response) => {
      this.setState({
        servers: response.servers,
      });
    });
  }

  branchPath() {
    return 'https://github.com/Workable/workable/tree';
  }

  commitPath() {
    return 'https://github.com/Workable/workable/commit';
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
            { this.state.servers.map((server, key) =>
              <tr key={key}>
                <td className="center">{server.server}</td>
                <td className="center">{server.environment}</td>
                <td className="center"><a href={`${this.branchPath()}/${server.branch}`} target="_blank">{server.branch}</a></td>
                <td className="center">{server.commit}</td>
                <td className="center"><a href={`${this.commitPath()}/${server.sha}`} target="_blank">{server.sha}</a></td>
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
