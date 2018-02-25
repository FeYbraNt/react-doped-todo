import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Bootstrap CSS libraries
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
        <TodoApp />,
    document.getElementById('root'));
registerServiceWorker();
