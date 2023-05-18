import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Loading from '../pages/Loading'
import { useColor } from '../hooks/useColor'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	useEffect(() => {
		const un = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return () => {
			un()
		}
	}, [theme, currentUser])

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{loading || (currentUser && theme == 'standart') ? <Loading /> : children}
		</AuthContext.Provider>
	)
}
