import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './Components/Home'
import Signup from './Components/signup'
import Login from './Components/login'
import PageNotFound from './Components/PageNotFound'


const App = () => {
  const token = localStorage.getItem("jwt")
  return (
    <div > 
      <Routes>
        <Route path='/' element={ token? <Home/> : <Navigate to={"/login"}/> }/> 
        <Route path='/signup' element={  <Signup/> }/> 
        <Route path='/login' element={ <Login/> }/> 
        <Route path='*' element={ <PageNotFound/> }/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App