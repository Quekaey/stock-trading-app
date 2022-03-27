import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import '../style/Home.css'
import '../style/mobile.css'
import Welcome from '../components/Welcome'

export default function Home() {
  if (!localStorage.getItem('data')) {
    return (
      <div id="home">
        <div className="home-content mt-5">
          <h1>Welcome to Fantasy Stock Trader!</h1>
          <p>Experience the thrill of the stock market by utilizing fake money to purchase real stocks and buy or sell shares.
          Search stock symbols and use fake money to trade and test your skills.</p>
          <p>Before you start, you must first register so the system can identify who you are.</p>
          <div className="home-buttons-wrapper">
            <Register />
            <Login />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Welcome />
    )
  }
}
