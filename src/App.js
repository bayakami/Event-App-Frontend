import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import {Button} from 'react-bootstrap'

function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"));

  const client = new ApiClient(
    token,
    () => logout()
  );

  const login = (newToken) => {
    window.localStorage.setItem("token",newToken);
    changeToken(newToken);
  }
  
  //logout user
  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken(undefined);
  }

/*   const removeToken = (userToken) => { // export function from module 
    localStorage.removeItem("token");
    changeToken(null);
  } */

  return (
    <>
      {token ? (
        <>
        
        
        <Dashboard client={client} />
        <br></br>
        <Button variant="secondary" onClick={logout} size="sm">
          Log Out
        </Button>
        </>
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )

      }
      
    </>
  );
}

export default App;
