import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Myc2e from './C2EComponents/myc2e';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext(null);

function App() {
  const OAuthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const token = localStorage.getItem('oAuthToken');
  const user = token ? jwt_decode(token) : null;
  
  return (
    <GoogleOAuthProvider clientId={OAuthClientId}>
      <UserContext.Provider value={user}>
        <Router>
          <div className="ts-particles"></div>
          <Switch>
            <Route exact path="/">
              <Myc2e />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
