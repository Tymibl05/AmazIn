import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../Store';
// import axios from 'axios';
import './signin.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const {
    state: { user },
    dispatch,
  } = useStore();
  useEffect(() => {
    if (user) navigate(redirect || '/');
  }, [user, navigate, redirect]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/users/signin';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }
    const user = await res.json();
    dispatch.signin(user);
  }; // FETCH

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     const url = 'http://localhost:5000/api/users/signin';
  //     try {
  //       const res = await axios.post(url, { email, password });
  //       console.log(res);
  //     } catch (err) {
  //       setError(err.response.data.err);
  //     }
  //   }; // AXIOS

  return (
    <div id="SignIn">
      <div>
        <h1>Sign In</h1>
        <form action="" onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="link">
          New Customer? <a href="/">Create your account</a>
        </div>
      </div>
    </div>
  );
};
