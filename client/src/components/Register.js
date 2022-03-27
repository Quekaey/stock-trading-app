import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { UserNameContext } from '../context/UserNameContext'

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useContext(UserNameContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/register', {
        user: user,
        email: email,
        password: password
      });

      localStorage.setItem('data', JSON.stringify(response.data));
      setUserName(response.data.name);

      if (JSON.parse(localStorage.getItem('data'))) {
        props.history.push('/');
      }
    } catch (err) {
      console.error('error in createUser', err.message)
    }
  }

  return (
    <>
      <Button onClick={handleShow} className="btn btn-warning">Register</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createUser}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="username"
              value={user}
              onChange={(e) => setUser(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose} >Submit</Button>
        </Form>
      </Modal>
    </>
  );
}

export default withRouter(Register)
