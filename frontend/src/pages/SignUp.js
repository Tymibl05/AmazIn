import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store';
import './signup.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const signup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords Do Not Match');
      return;
    }
    setError(false);
    const value = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    const url = 'http://localhost:5000/api/users/signup';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }
    const user = await res.json();
    console.log(user);
    dispatch.signup(user);
    navigate('/');
  };
  return (
    <div id="SignUp">
      <div>
        <h1>Sign Up</h1>
        <form action="" onSubmit={signup}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">New Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
