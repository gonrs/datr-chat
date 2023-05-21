import { createContext, useContext, useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext.jsx'
import { useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext)
	const [Chats, setChats] = useState(null)
	const INITIAL_STATE = {
		chatId: 'null',
		user: {},
	}
	useEffect(() => {
		function getChats() {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
				console.log(doc.data());
				setChats(doc.data())
			})
			return () => {
				unsub()
			}
		}
		currentUser?.uid && getChats()
	}, [currentUser?.uid])

	const ChatReducer = (state, action) => {
		switch (action.type) {
			case 'CHENGE_USER':
				return {
					user: action.payload,
					chatId:
						currentUser.uid > action.payload.uid
							? currentUser.uid + action.payload.uid
							: action.payload.uid + currentUser.uid,
				}
			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE)
	return (
		<ChatContext.Provider value={{ data: state, dispatch, Chats }}>
			{children}
		</ChatContext.Provider>
	)
}
