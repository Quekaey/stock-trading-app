import React, { useContext } from "react";
import '../style/Home.css'
import { UserNameContext } from '../context/UserNameContext'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Welcome = () => {
  const [userName, setUserName] = useContext(UserNameContext)

  return (
    <div id="home">
      <div className="home-content m-0 text-justify w-100">
        <h1>Welcome {userName}!</h1>
        <Card bg="transparent" border="primary" className="w-75 mt-3">
          <Card.Body className="d-block">
            <Card.Title as="h3">Trade Page</Card.Title>
            <Card.Text>
              Buy stocks by searching for a specific stock, or view recommended stocks. You can also buy or sell stocks that you already have in your portfolio. You are initially given a total of 100,00 dollars to buy stocks with.</Card.Text>
            <Link to="/main">
              <Button variant="primary">Start Trading</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card bg="transparent" border="primary" className="mt-3 w-75">
          <Card.Body className="d-block">
            <Card.Title as="h3">Portfolio Page</Card.Title>
            <Card.Text>
              To view your personal data and current holdings take a look at the portfolio page. With this information you can make informed decisions on what stocks to buy and sell.
              </Card.Text>
            <Link to="/portfolio">
              <Button variant="primary">Personal Information</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Welcome

