import { createBrowserRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<h1>This is default route</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes