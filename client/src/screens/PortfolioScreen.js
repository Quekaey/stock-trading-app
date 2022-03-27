import React, { useState, useEffect } from 'react'
import UserInfo from '../components/UserInfo'
import CurrentHoldings from '../components/CurrentHoldings'
import HeaderPortfolio from '../components/HeaderPortfolio'
import Chart from '../components/charts/Chart'
import { getHoldings } from '../http-utilities/tradeUtilities'
import { Spinner } from 'react-bootstrap'

const PortfolioScreen = () => {
  const [holdings, setHoldings] = useState([]);
  const [isSpinner, setSpinner] = useState(true);

  useEffect(() => {
    const fetchHoldingsData = () => {
      getHoldings()
        .then(holdingsData => {
          setHoldings(holdingsData);
          setSpinner(false)
        })
        .catch(err => console.error('error get holdings', err));
    }
    fetchHoldingsData();
  }, []);

  return (
    <section>
      <HeaderPortfolio />
      <div className="container">
        <UserInfo />
        {isSpinner ?
          <Spinner animation="border" className="spinner mt-5" />
          :
          <>
            <Chart />
            {holdings.length > 0 ?
              holdings.map(holding =>
                <CurrentHoldings
                  holding={holding}
                  key={holding.holding_id}
                />)
              : <CurrentHoldings />
            }
          </>
        }
      </div>
    </section >
  )
};

export default PortfolioScreen