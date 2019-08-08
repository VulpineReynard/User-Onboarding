import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, } from "formik";
import UserCard from './UserCard';
import * as Yup from 'yup';

const UserForm = ({ errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(status) {
      setUsers([...users, status]);
    }
  }, [status])

  return ([
    <div className="user-form">
      <h1>New User Form</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {errors.name && <p className="error">{errors.name}</p>}
        
        <Field type="email" name="email" placeholder="Email" />
        {errors.email && <p className="error">{errors.email}</p>}

        <Field type="password" name="password" placeholder="Password" />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Submit!</button>
      </Form>
    </div>,

    <div className="user-grid">
      { users.map((user, index) => <UserCard key={index} user={user}/>) }
    </div>
  ]);
}

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || '',
      email: email || '',
      password: password || ''
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().required('Email is required.').email(),
    password: Yup.string().required('Password is required.').min(8)
  }),

  handleSubmit({ name, email, password }, { setStatus }) {
    axios.post('https://reqres.in/api/users/', { name, email, password })
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  },
})(UserForm);

export default FormikForm;