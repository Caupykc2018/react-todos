import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { store } from './store';
import { TitleState } from './context/title/TitleState';
import { SelectedUsersState } from './context/selectedUsers/SelectedUsersState';

ReactDOM.render(
  <Provider store={store}>
    <TitleState>
      <SelectedUsersState>
        <App />
      </SelectedUsersState>
    </TitleState>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
