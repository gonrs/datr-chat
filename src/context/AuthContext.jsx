import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		const un = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			console.log(user)
		})

		return () => {
			un()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	)
}
