import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// create object store in IndexedDB
let db = indexedDB.open('actions', 1);
db.onupgradeneeded = function(event) {
  let db = event.target.result;
  db.createObjectStore('requests', { autoIncrement: true });
};

window.addEventListener('online', () => {
  const db = indexedDB.open('actions', 1);
  db.onsuccess = function(event) {
    let db = event.target.result;
    let objStore = db
      .transaction(['requests'], 'readwrite')
      .objectStore('requests');
    objStore.getAll().onsuccess = function(event) {
      console.log(event);
      let requests = event.target.result;
      for (let request of requests) {
        if (request.type === 'CHECK_OUT_FAILURE') {
          console.log('POSTING');
          req('http://localhost:8000/checkOuts', request.meta.offline, 'POST');
        } else if (request.type === 'CHECK_IN_FAILURE') {
          console.log('PATCHING');
          req(
            'http://localhost:8000/checkOuts' + request.meta.offline.id,
            request.meta.offline,
            'PATCH',
          );
        }
      }
    };
  };
});

function req(url = '', data = {}, method) {
  // Default options are marked with *
  fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
