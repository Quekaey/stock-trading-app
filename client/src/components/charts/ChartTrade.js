import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

const ChartTrade = ({ symbol }) => {
  const [chartData, setChartData] = useState({})
  const [holdingDays, setHoldingDays] = useState([]);
  const [holdingPrices, setHoldingPrices] = useState([]);

  useEffect(() => {
    const getHoldingPricesByDates = async () => {
      try {
        const response = await axios.get(`api/chart/data/?symbol=${symbol}`);
        setDatesAndPricesStates(response.data)
      } catch (err) {
        console.error('error in getHoldingPricesByDates', err.message);
      }
    }
    getHoldingPricesByDates();
  }, [])

  const setDatesAndPricesStates = (data) => {
    for (let i = 0; data.length > i; i++) {
      setHoldingDays(prevState => [...prevState, data[i].label]);
      setHoldingPrices(prevState => [...prevState, data[i].close]);
    }
  }

  useEffect(() => {
    if (holdingDays.length > 0) {
      setChartData({
        labels: holdingDays,
        datasets: [
          {
            label: symbol,
            data: holdingPrices,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      });
    }
  }, [holdingPrices]);

  return (
    <div className="chart">
      {holdingDays.length > 0 &&
        <Line
          data={holdingDays.length > 0 ? chartData : null}
          options={{
            title: {
              display: true,
              text: `Average Prices For ${symbol} last 10 business days`,
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right',
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Price',
                  fontSize: 15,
                  fontStyle: 'italic'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontSize: 15,
                  fontStyle: 'italic'
                }
              }]
            }

          }}
        />
      }
    </div>
  )
};

export default ChartTrade;
