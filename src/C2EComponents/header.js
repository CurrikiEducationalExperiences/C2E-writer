import React, { useContext } from 'react';
import { googleLogout } from '@react-oauth/google'; 
import { UserContext } from '../App';
import logo from '../assets/images/logo.png';

const Header = () => {
  const user = useContext(UserContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="header-logo" />
      {user ? (
        <div className="login-user">
          <div className="user-info">
            <img src={user.picture} alt="" />
            <h2>{user.name}</h2>
          </div>
          <button className="login" onClick={() => {
            googleLogout();
            localStorage.removeItem('oAuthToken');
            window.location.reload();
          }}>
            Logout
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
