import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import configureStore from './store';
import { TitleState } from './context/title/TitleState';
import { SelectedUsersState } from './context/selectedUsers/SelectedUsersState';

ReactDOM.render(
  <Provider store={configureStore()}>
    <TitleState>
      <SelectedUsersState>
        <App />
      </SelectedUsersState>
    </TitleState>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
