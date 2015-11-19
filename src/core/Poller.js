'use strict';

import http from './HttpClient';
import { poller_interval } from '../config';
import { getStagingEnvironments } from '../env';

class Poller {

  constructor(io) {
    this.io = io;
    this.stagings = getStagingEnvironments();
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

  compact(items) {
    return items.filter(function(item){ return (item !== null);});
  }

  store(items) {
    items.forEach((item, index) => {
      //TODO save last result
    });
    return items;
  }

  broadcast(items) {
    Promise.all(items).then((responses) => {
      this.io.emit('observe', {
        servers: responses
      });
    });
  }

  pingServers() {
    let promises = [];
    for (let staging of this.stagings) {
      let promise = http.get(staging.url + '/version');
      promises.push(promise);
    }
    return promises;
  }

}

export default Poller;
