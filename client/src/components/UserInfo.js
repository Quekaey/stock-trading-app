import React, { useState, useEffect, useContext } from 'react'
import '../style/mobile.css'
import { UserNameContext } from '../context/UserNameContext'
import { getWalletData } from '../http-utilities/portfolioUtilities'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserInformation() {
  const [userName, setUserName] = useContext(UserNameContext)
  const [wallet, setWallet] = useState(0);
  const [totalHoldingsAmount, setTotalHoldingsAmount] = useState(0)

  useEffect(() => {
    const fetchWalletData = async () => {
      getWalletData()
        .then(res => {
          setWallet(res.wallet)
          setTotalHoldingsAmount(res.holdingsAmount)
        })
        .catch(err => console.error('error get wallet', err));
    }
    fetchWalletData();
  }, []);

  return (
    <Card className="m-auto w-50 user-info" align="center" border="dark">
      <Card.Header className="h4">Account Information</Card.Header>
      <ListGroup variant="flush" className="h5">
        <ListGroup.Item>User: {userName}</ListGroup.Item>
        <ListGroup.Item>Account Balance: ${wallet.toFixed(1)}</ListGroup.Item>
        <ListGroup.Item>Total Holding Value: ${totalHoldingsAmount.toFixed(1)}</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default UserInformation