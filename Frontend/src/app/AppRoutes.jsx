import { Route, Routes } from 'react-router-dom'
import Home from '../features/notes/pages/Home'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default AppRoutes
