import React, { useEffect, useState } from 'react'
import { getHoldings } from '../http-utilities/tradeUtilities'

function RenderRecommendations(props) {
  const [shares, setShares] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [holdingStyleColor, setHoldingStyleColor] = useState('');
  const [positiveSign, setPositiveSign] = useState(false);

  useEffect(() => {

    getHoldings()
      .then(holdingsData => setHoldings(holdingsData))
      .catch(err => console.error('error get holdings', err));

    const isHoldingNegativeOrPositive = () => {
      if (String(changePercent).charAt(0) === '-') {
        setHoldingStyleColor('red');
        setPositiveSign(false)
      } else {
        setHoldingStyleColor('green')
        setPositiveSign('+')
      }
    }

    isHoldingNegativeOrPositive();
  }, []);

  useEffect(() => {
    const compareSelectedHoldingToExistingList = () => {
      const holdingExist = holdings.find(holding => holding.symbol == props.recommendedHolding.symbol);
      if (holdingExist) {
        setShares(holdingExist.shares);
      }
    }

    compareSelectedHoldingToExistingList();
  }, [holdings]);

  const { companyName, latestPrice, changePercent, change, symbol } = props.recommendedHolding;

  return (
    <div className="recommended-holding">
      <div className="selected-holding card mt-3">
        <div className="card-head">
          <h2> {companyName}: {symbol}</h2>
          <button className="btn btn-info" onClick={() => props.handleTrade(symbol)}>Trade</button>
        </div>
        <hr />
        <div className="card-body">
          <div className="price">
            <strong>Current Price</strong>
            <p className={holdingStyleColor}>${latestPrice.toFixed(2)}</p>
          </div>
          <div className="percent">
            <strong>Percent Change</strong>
            <p className={holdingStyleColor}>{positiveSign}{changePercent.toFixed(3)}%</p>
          </div>
          <div className="change">
            <strong>Daily Gain/Loss</strong>
            <p className={holdingStyleColor}>{positiveSign}${change}</p>
          </div>
          <div className="shares-held">
            <strong>Shares Held</strong>
            <p>{shares}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default RenderRecommendations