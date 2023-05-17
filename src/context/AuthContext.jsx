import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Loading from '../pages/Loading'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const un = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return () => {
			un()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	)
}
