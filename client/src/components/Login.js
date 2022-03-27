import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { UserNameContext } from '../context/UserNameContext'

const Login = (props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useContext(UserNameContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/auth/login", {
        params: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem('data', JSON.stringify(response.data));
      setUserName(response.data.name)

      if (JSON.parse(localStorage.getItem('data'))) {
        props.history.push('/');
      }
    } catch (err) {
      console.error("error in loginUser", err.message);
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="btn btn-primary">Login</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={loginUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" >Submit</Button>
        </Form>
      </Modal>
    </>
  );
}

export default withRouter(Login)
