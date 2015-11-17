/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client'
import styles from './ObservablesPage.scss';
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
          	<th className="center">Environment</th>
          	<th className="center">Branch</th>
          	<th className="center">Last Commit</th>
            <th className="center">Author</th>
            <th className="center">Commits since master</th>
            <th className="center">Last deploy at</th>
          	<th className="center"><span className="lbl">Status</span></th>
            { this.state.observables.map((observable, i) =>
              <tr>
                <td className="center">{observable.domain}</td>
                <td className="center">{observable.branch}</td>
                <td className="center">{observable.sha}</td>
                <td className="center">{observable.author}</td>
                <td className="center">{observable.count}</td>
                <td className="center">{observable.updated_at}</td>
                <td className="center">V</td>
              </tr>
            )}
         	</table>
        </section>
      </div>
    );
  }

}

export default ObservablesPage;
