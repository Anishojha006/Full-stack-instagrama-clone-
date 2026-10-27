import {createBrowserRouter} from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/posts/pages/Feed';
import CreatePost from './features/posts/pages/CreatePost';
import Profile from './features/profile/pages/Profile';
import ProtectedRoute from './shared/ProtectedRoute.jsx';

export  const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },{

        path:'/',
        element:<ProtectedRoute><Feed/></ProtectedRoute>
    },{

        path:'/create-post',
        element:<ProtectedRoute><CreatePost/></ProtectedRoute>
    },
    {
        path:'/profile',
        element:<ProtectedRoute><Profile/></ProtectedRoute>
    }

]);