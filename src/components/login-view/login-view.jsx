import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://evening-brushlands-63613.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  }

  return (
    <form className="form-login">
      <label className="h1"> Welcome to the Movie App! Please sign in: </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" className="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};