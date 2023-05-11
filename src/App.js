import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registr from './pages/Register'

function App() {
	return (
		<Routes>
			<Route element={<Home />} path='/' />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Registr />} />
		</Routes>
	)
}

export default App
