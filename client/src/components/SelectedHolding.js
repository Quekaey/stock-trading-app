import React, { useState, useContext, useEffect } from 'react'
import BuyModal from './modals/BuyModal';
import SellModal from './modals/SellModal';
import { getHoldings } from '../http-utilities/tradeUtilities'
import ChartTrade from './charts/ChartTrade'

const SelectedHolding = ({ selectedHolding, buyNewHolding, sellShares, updateShares }) => {
  const [shares, setShares] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [holdingStyleColor, setHoldingStyleColor] = useState('');
  const [positiveSign, setPositiveSign] = useState(false);

  useEffect(() => {
    isHoldingNegativeOrPositive();
    getHoldingsData()
  }, []);

  useEffect(() => {
    compareSelectedHoldingToExisting();
  }, [holdings]);

  const getHoldingsData = () => {
    getHoldings()
      .then(holdingsData => setHoldings(holdingsData))
      .catch(err => console.error('error get holdings', err));
  }

  const isHoldingNegativeOrPositive = () => {
    if (String(changePercent).charAt(0) === '-') {
      setHoldingStyleColor('red');
      setPositiveSign(false)
    } else {
      setHoldingStyleColor('green')
      setPositiveSign('+')
    }
  }

  useEffect(() => {
    isHoldingNegativeOrPositive();
  }, [selectedHolding]);

  const handleBuyShares = (shares) => {
    updateShares(shares);
    buyNewHolding(shares);
    setShares(prevState => prevState + parseInt(shares));
  }

  const handleSellShares = (shares) => {
    sellShares(shares);
    updateShares(shares);
    setShares(prevState => prevState - parseInt(shares));
  }

  const compareSelectedHoldingToExisting = () => {
    if (selectedHolding) {
      const holdingExist = holdings.find(holding => holding.symbol == selectedHolding.symbol);
      holdingExist ? setShares(holdingExist.shares) : null;
    }
  }

  const { companyName, symbol, latestPrice, previousClose, changePercent, change } = selectedHolding;

  return (
    <>
      <div className="selected-holding card mt-4">
        <div className="card-head">
          <h2> {companyName}: {symbol}</h2>
          <div className="card-buttons">
            <BuyModal
              handleBuyShares={handleBuyShares}
              selectedHolding={selectedHolding}
              shares={shares}
            />
            <SellModal
              handleSellShares={handleSellShares}
              selectedHolding={selectedHolding}
              shares={shares}
            />
          </div>
        </div>
        <hr />
        <div className="card-body">
          <div className="price">
            <strong>Current Price</strong>
            <p className={`mb-0 ${holdingStyleColor}`}>${latestPrice.toFixed(2)}</p>
            <small className={holdingStyleColor}>Previous Closed: ${previousClose.toFixed(2)} </small>
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
      <ChartTrade symbol={symbol} />
    </>
  )
}

export default SelectedHolding