import http from './HttpClient';
import { servers } from '../config';
import io from 'socket.io'

class Poller {

  constructor(){
    this.pollInterval = 3000;
  }

  poll(){
    setInterval(() => {
      this.promises = this.getPromises();
      Promise.all(this.promises).then((observables) => {
        console.log('Batch finished, broadcasting results');
        io.emit('observe', { for: 'everyone' });
      });
    }, this.pollInterval);
  }

  getPromises() {
    let promises = [];
    for( let server of servers ){
      let promise = http.get(server.url);
      promises.push(promise);
    }
    return promises;
  }

}

export default Poller;
