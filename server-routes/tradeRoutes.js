const express = require('express');
const router = express.Router();
const pool = require('../database/db')

// get holdings
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params
    const response = await pool.query("SELECT * FROM holdings WHERE user_id = ($1)", [user_id]);
    res.json(response.rows);
  } catch (err) {
    console.error('error from server- get all holdings', err.message);
  }
})

// create holding
router.post('/', async (req, res) => {
  try {
    const { name, symbol, shares, changePercent, price, user_id } = req.body;
    const newHolding = await pool.query("INSERT INTO holdings (name, symbol, shares, percent_change, price, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, symbol, shares, changePercent, price, user_id]);
    res.json(newHolding.rows[0]);
  } catch (err) {
    console.error('error from server- create new holding', err.message);
  }
})

// update existing holding
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { shares } = req.body;
    const updatedHolding = await pool.query("UPDATE holdings SET shares = $1 WHERE holding_id = $2 RETURNING *", [shares, id])
    res.json(updatedHolding.rows[0]);
  } catch (err) {
    console.error('error from server- update holding', err.message);
  }
})

// delete existing holding
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHolding = await pool.query("DELETE FROM holdings WHERE holding_id = $1", [id]);
    res.send(`successfully deleted holding id: ${id}`);
  } catch (err) {
    console.error('error from server- delete holdings', err.message);
  }
})

module.exports = router;