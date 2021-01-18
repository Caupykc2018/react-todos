import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { TodosPage } from "./pages/TodosPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path={"/login"}/>
        <Route component={RegistrationPage} path={"/register"}/>
        <Route component={TodosPage} path={"/todos"}/>
        <Route component={AdminPage} path={"/admin"}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
