import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dashboard from './components/dashboard/Dashboard'
import Login from './components/account/Login'

function App () {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  return <Router> {isLoggedIn ? <Dashboard /> : <Login />} </Router>
}

export default App
