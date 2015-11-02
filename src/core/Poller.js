'use strict';

import http from './HttpClient';
import {
  poller_interval, servers
}
from '../config';

class Poller {

  constructor(io) {
    this.io = io;
    this.pinged_servers = {};
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
    Promise.all(this.pingServers()).then((responses) => {
      return this.compact(responses);
    }).then((responses) => {
      return this.store(responses);
    }).then((responses) => {
      return this.broadcast(responses);
    });
  }

  // private

  compact(items) {
    return items.filter(function(item){ return (item !== null);});
  }

  store(items) {
    items.forEach((observable, index) => {
      this.pinged_servers[observable.domain] = observable;
    });
    return items;
  }

  broadcast(items) {
    console.log('Broadcasting results');
    Promise.all(items).then((responses) => {
      this.io.emit('observe', {
        observables: responses
      });
    });
  }

  pingServers() {
    let promises = [];
    for (let server of servers) {
      let promise = http.get(server.url);
      promises.push(promise);
    }
    return promises;
  }

}

export default Poller;
