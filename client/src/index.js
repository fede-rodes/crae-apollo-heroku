import 'unfetch/polyfill';
// 'fetch' is now installed globally if it wasn't already available
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Routes from './routes';
import registerServiceWorker from './register-sw';

ReactDOM.render(<App component={Routes} />, document.getElementById('main'));
registerServiceWorker();
