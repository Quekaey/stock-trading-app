import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getHoldings } from '../../http-utilities/tradeUtilities';

const Chart = () => {
  const [chartData, setChartData] = useState({})
  const [holdings, setHoldings] = useState([]);
  const [holdingNames, setHoldingNames] = useState([]);
  const [holdingShares, setHoldingShares] = useState([]);

  useEffect(() => {
    getHoldingsData();
  }, []);

  const getHoldingsData = () => {
    getHoldings()
      .then(holdingsData => setHoldings(holdingsData))
      .catch(err => console.error('error get holdings', err));
  }

  useEffect(() => {
    for (let i = 0; holdings.length > i; i++) {
      setHoldingNames(prevState => [...prevState, holdings[i].name]);
      setHoldingShares(prevState => [...prevState, holdings[i].shares]);
    }
  }, [holdings])

  useEffect(() => {
    setChartData({
      labels: holdingNames,
      datasets: [
        {
          label: 'Population',
          data: holdingShares,
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
  }, [holdingNames])

  return (
    <div className="chart">
      {holdingNames.length > 0 &&
        <Pie
          data={holdingNames.length > 0 ? chartData : null}
          options={{
            title: {
              display: true,
              fontSize: 15
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      }
    </div>
  )
}

export default Chart;
