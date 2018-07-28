import 'unfetch/polyfill';
// "fetch" is now installed globally if it wasn't already available
import React from 'react';
import ReactDOM from 'react-dom';
import './basscss.min.css';
import './index.css';
import App from './app';
import registerServiceWorker from './register-service-worker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
