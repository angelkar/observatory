import http from './HttpClient';
import {
  poller_interval, servers
}
from '../config';

class Poller {

  constructor(io) {
    this.io = io;
  }

  execute() {
    this.request();
    this.poll();
  }

  poll() {
    setInterval(() => {
      this.request();
    }, poller_interval);
  }

  request() {
    this.promises = this.getPromises();
    Promise.all(this.promises).then((observables) => {
      console.log('All polling requests complete. Broadcasting results.');
      this.io.emit('observe', {
        observables: observables
      });
    });
  }

  getPromises() {
    let promises = [];
    for (let server of servers) {
      let promise = http.get(server.url);
      promises.push(promise);
    }
    return promises;
  }

}

export default Poller;
