import React, { useState, useEffect, createContext } from 'react';

export const UserNameContext = createContext();

export const UserNameProvider = (props) => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('data'))) {
      setUserName(JSON.parse(localStorage.getItem('data')).name);
    }
  }, [])

  return (
    <UserNameContext.Provider value={[userName, setUserName]}>
      {props.children}
    </UserNameContext.Provider>
  )
}

