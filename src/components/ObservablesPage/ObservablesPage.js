/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ObservablesPage.css';
import withStyles from '../../decorators/withStyles';
import http from '../../core/HttpClient';

@withStyles(styles)
class ObservablesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      observable: ''
    }
  }

  componentDidMount() {
    this.getData().then((observable) => {
      this.onDataReceived(observable);
    });
  }

  onDataReceived(data) {
    this.setState({
      observable: data
    });
  }

  getData() {
    return http.get('http://lvh.me:3000/version');
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
            <tr>
            	<td>{ 'localhost' }</td>
            	<td dangerouslySetInnerHTML={{__html: this.state.observable.branch }} />
            	<td dangerouslySetInnerHTML={{__html: this.state.observable.sha }} />
            	<td dangerouslySetInnerHTML={{__html: this.state.observable.author }} />
            	<td dangerouslySetInnerHTML={{__html: this.state.observable.count }} />
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default ObservablesPage;
