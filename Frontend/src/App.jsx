import React from 'react'
import { RouterProvider } from 'react-router'
import {router} from './app.routes.jsx'
import '../src/features/shared/globel.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/posts/post.context.jsx'
import { ProfileContextProvider } from './features/profile/profile.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ProfileContextProvider>
          <RouterProvider router={router} />
        </ProfileContextProvider>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App