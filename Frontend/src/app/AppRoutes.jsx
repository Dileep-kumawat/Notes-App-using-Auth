import { Route, Routes } from 'react-router-dom'
import Home from '../features/notes/pages/Home'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={
                <ProtectedRoute>
                    <Register />
                </ProtectedRoute>
            } />
            <Route path='/login' element={
                <ProtectedRoute>
                    <Login />
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default AppRoutes
