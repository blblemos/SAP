import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App key={'APP'}/>
  </React.StrictMode>,
  document.getElementById('root')
);

