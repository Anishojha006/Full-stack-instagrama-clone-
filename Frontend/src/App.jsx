import React from 'react'
import { RouterProvider } from 'react-router'
import {router} from './app.routes.jsx'
import '../src/features/shared/globel.scss'

const App = () => {
  return (
   <RouterProvider router={router} />
  )
}

export default App