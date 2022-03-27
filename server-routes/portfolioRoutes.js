const express = require('express');
const router = express.Router();
const pool = require('../database/db')

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params
    const userName = await pool.query("SELECT user_name FROM users WHERE user_id = ($1)", [user_id]);
    res.send(userName.rows[0].user_name);
  } catch (err) {
    console.error('error from server- get user name', err.message);
  }
})

router.get('/wallet/:user_id', async (req, res) => {
  try {
    const wallet = 10000
    let holdingsAmount = 0
    const { user_id } = req.params
    const response = await pool.query("SELECT * FROM holdings WHERE user_id = ($1)", [user_id]);
    for (const element of response.rows) {
      holdingsAmount += element.shares * element.price
    }
    res.json({ wallet: wallet - holdingsAmount, holdingsAmount });
  } catch (err) {
    console.error('error from server- get wallet and holdings amount', err.message);
  }
})

module.exports = router;