/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
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
    let promises = this.getAllPromises();
    Promise.all(promises).then((observables) => {
      this.onDataReceived(observables);
    });
  }

  onDataReceived(data) {
    this.setState({
      observables: data
    });
  }

  getAllPromises() {
    let promises = [];
    for( let server of servers ){
      let promise = http.get(server.url);
      promises.push(promise);
    }
    return promises;
  }

  render() {
    return (
      <div className="ObservablePage">
        <div className="ObservablePage-container">
          <table id="observableTable">
          <tbody>
            <tr>
            	<th>Name</th>
            	<th>Branch</th>
            	<th>Last Commit</th>
            	<th>Author</th>
            	<th>Commits since master</th>
            </tr>
            { this.state.observables.map((observable, i) =>
              <tr>
                <td>{ 'localhost' }</td>
                <td dangerouslySetInnerHTML={{__html: observable.branch }} />
                <td dangerouslySetInnerHTML={{__html: observable.sha }} />
                <td dangerouslySetInnerHTML={{__html: observable.author }} />
                <td dangerouslySetInnerHTML={{__html: observable.count }} />
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
