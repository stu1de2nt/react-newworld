import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
function IndexRouter() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path='*' element={<NewsSandBox/>}/>
        <Route path='/login' element ={<Login/>}/>
      </Routes>
    </HashRouter>
  )
}

export default IndexRouter
