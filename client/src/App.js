import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './style/index.css';
import Navigation from './components/Navigation'
import Home from './screens/HomeScreen'
import TradeScreen from './screens/TradeScreen'
import PortfolioScreen from './screens/PortfolioScreen'
// import Confirm from './Page_Components/trade/Confirm'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './protected-routes/ProtectedRoute'
import { UserNameProvider } from './context/UserNameContext'
// import { HoldingsAmountProvider } from './HoldingsAmountContext'

const App = () => {
  return (
    <Router>
      <UserNameProvider>
        <div className="app" id="app-container">
          <Navigation />
          <main id="main-container">
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/main" component={TradeScreen} />
            <ProtectedRoute path="/portfolio" component={PortfolioScreen} />
          </main>
        </div>
      </UserNameProvider>
    </Router>
  );
}

export default App;
