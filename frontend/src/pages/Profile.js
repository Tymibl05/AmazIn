import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Store';
import './profile.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useStore();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user, navigate]);
  const updateProfile = async (e) => {
    e.preventDefault();
    if (
      (form.password || form.confirmPassword) !== '' &&
      form.password !== form.confirmPassword
    ) {
      setError('Passwords Do Not Match');
      return;
    }
    setError(false);
    const value =
      (form.password || form.confirmPassword) !== '' &&
      form.password === form.confirmPassword
        ? {
            name: form.name,
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
          };
    const url = 'http://localhost:5000/api/users/profile';
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(value),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }
    dispatch.updateProfile({ name: form.name, email: form.email });
  };
  return (
    <div id="Profile">
      <div>
        <h1>User Profile</h1>
        <form action="" onSubmit={updateProfile}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">New Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required={form.password !== ''}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};
