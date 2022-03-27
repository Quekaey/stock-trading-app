const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/stock/search', (req, res) => {
  const symbol = req.query.symbol
  axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote&token=pk_e187f175e42d4ac89045179e525ef0e5`)
    .then(response => {
      res.send(response.data[Object.keys(response.data)[0]].quote)
    })
    .catch(error => {
      console.log('error from server- API routes', error)
    })
})

router.get('/stocks/recommendation', (req, res) => {
  const holdings = []
  axios.get('https://cloud.iexapis.com/stable/stock/market/batch?symbols=msft,nflx,googl&types=quote&token=pk_e187f175e42d4ac89045179e525ef0e5')
    .then(function (response) {
      Object.keys(response.data).forEach(function (key) {
        holdings.push(response.data[key].quote)
      })
      res.json(holdings)
    })
    .catch(function (err) {
      console.log('error from server- API routes', err)
    })
})

router.get('/chart/data', (req, res) => {
  const symbol = req.query.symbol
  axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/10d?token=pk_e187f175e42d4ac89045179e525ef0e5`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log('error from server- API routes', error)
    })
});


module.exports = router;