import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Chats() {
	const [message, setMessage] = useState('')

	const [chats, setChats] = useState([])
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		function getChats() {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
				setChats(doc.data())
			})
			return () => {
				unsub()
			}
		}
		currentUser.uid && getChats()
	}, [currentUser.uid])
	console.log(Object.entries(chats))
	return (
		<div className='chats'>
			{Object.entries(chats)?.map(chat => {
				return (
					<div key={chat[0]} className='userChat'>
						<img src={chat[1].userInfo.photoURL} alt='' />
						<div className='userChatInfo'>
							<span>{chat[1].userInfo.displayName}</span>
							<p>{chat[1].userInfo.lastMessage?.text}</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Chats
