import axios from 'axios'

export const createHolding = async (holding) => {
  try {
    const response = await axios.post('/trade', {
      name: holding.companyName,
      symbol: holding.symbol,
      shares: holding.shares,
      price: holding.price,
      changePercent: holding.changePercent,
      user_id: JSON.parse(localStorage.getItem('data')).id
    })
  } catch (err) {
    console.error('Error in create holding', err.message)
  }
}

export const getHoldings = async () => {
  try {
    const response = await axios.get(`/trade/${JSON.parse(localStorage.getItem('data')).id}`);
    return response.data;
  } catch (err) {
    console.error('Error in get holdings', err.message);
  }
}

export const updateHolding = async (id, shares) => {
  try {
    const response = await axios.put(`trade/${id}`, {
      shares
    })
  } catch (err) {
    console.error('Error in update holding', err.message)
  }
}

export const deleteHolding = async (id) => {
  try {
    const response = await axios.delete(`/trade/${id}`);
  } catch (err) {
    console.error('Error in delete holding', err.message);
  }
}

export const searchForHolding = async (symbol) => {
  try {
    const response = await axios.get(`api/stock/search/?symbol=${symbol}`);
    return response.data
  } catch (err) {
    console.error('error in search for holding', err.message);
  };
};


