import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// this links to the index.html file by referenceing the tag below
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
