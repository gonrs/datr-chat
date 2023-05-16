import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registr from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
	const { currentUser } = useContext(AuthContext)

	const ProtectedRoot = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/login' />
		}
		return children
	}
	const ProtectedRoot2 = ({ children }) => {
		if (currentUser) {
			return <Navigate to='/' />
		}
		return children
	}

	return (
		<Routes>
			<Route
				element={
					<ProtectedRoot>
						<Home />
					</ProtectedRoot>
				}
				path='/'
			/>
			<Route
				path='/login'
				element={
					<ProtectedRoot2>
						<Login />
					</ProtectedRoot2>
				}
			/>
			<Route
				path='/register'
				element={
					<ProtectedRoot2>
						<Registr />{' '}
					</ProtectedRoot2>
				}
			/>
		</Routes>
	)
}

export default App
