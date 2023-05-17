import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Chats() {
	const [message, setMessage] = useState('')
	const [chats, setChats] = useState([])
	const { currentUser } = useContext(AuthContext)
	const { dispatch } = useContext(ChatContext)

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
	function handleSelect(user) {
		dispatch({ type: 'CHENGE_USER', payload: user })
	}
	//

	return (
		<div className='chats'>
			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map(chat => {
						let a = chat[1].lastMessage?.text ? chat[1].lastMessage.text : ''
						if (a.length > 35) {
							a = a.slice(0, 35) + '...'
						}
						return (
							<div
								key={chat[0]}
								className={`userChat `}
								onClick={() => handleSelect(chat[1].userInfo)}
							>
								<img src={chat[1].userInfo?.photoURL} alt='' />
								<div className='userChatInfo'>
									<span>{chat[1].userInfo?.displayName}</span>
									<p>{a}</p>
								</div>
							</div>
						)
					})}
		</div>
	)
}

export default Chats
