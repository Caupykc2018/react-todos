import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { TodosPage } from './pages/TodosPage';
import { authEmit } from './services/api/socket/authEmit';
import { Notification } from './components/Notification';

function App() {
  const id = useSelector((state) => state.currentUser.id);

  useEffect(() => {
    authEmit(id || 0);
  }, [id]);

  return (
    <BrowserRouter>
      <Notification />
      <Switch>
        <Route component={LoginPage} path="/login" exact />
        <Route component={RegistrationPage} path="/register" />
        <Route component={TodosPage} path="/todos" />
        <Route component={AdminPage} path="/admin" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
