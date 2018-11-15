import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'unfetch/polyfill';
// 'fetch' is now installed globally if it wasn't already available
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import HeaderTitle from './components/header-title';
import Routes from './routes';
import registerServiceWorker from './register-sw';

ReactDOM.render(<App component={HeaderTitle} />, document.getElementById('header-title'));
ReactDOM.render(<App component={Routes} />, document.getElementById('main'));
registerServiceWorker();
