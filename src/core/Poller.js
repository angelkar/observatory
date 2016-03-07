import http from './HttpClient';
import { pollerInterval } from '../config';
import { getStagingEnvironments } from '../env';

class Poller {

  constructor(io) {
    this.io = io;
    this.stagings = getStagingEnvironments();
  }

  tap() {
    this.request();
  }

  execute() {
    this.poll();
  }

  poll() {
    setInterval(() => {
      this.request();
    }, pollerInterval);
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
    return items.filter((item) => {
      return (item !== null);
    });
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
        servers: responses,
      });
    });
  }

  pingServers() {
    const promises = [];
    for (const staging of this.stagings) {
      const promise = http.get(staging.url + '/version');
      promises.push(promise);
    }
    return promises;
  }

}

export default Poller;
