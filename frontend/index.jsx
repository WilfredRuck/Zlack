import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let state = {};
  const currentUser = window.currentUser;
  if (currentUser) {
     state = {
      session: { id: currentUser.id },
      entities: { users: { [currentUser.id]: currentUser } }
    }
    window.currentUser = null;
  }
  const store = configureStore(state);
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
})