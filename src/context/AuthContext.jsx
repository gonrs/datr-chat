import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import Loading from '../pages/Loading'
import { useColor } from '../hooks/useColor'
// import { useAuthState } from 'react-firebase-hooks/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	// const [currentUser] = useAuthState(auth)
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const { theme } = useColor(currentUser)
	useEffect(() => {
		console.log('1')
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
			{loading || (currentUser && theme === 'standart') ? (
				<Loading />
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
