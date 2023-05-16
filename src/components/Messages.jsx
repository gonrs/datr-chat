import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

function Messages() {
	const { data } = useContext(ChatContext)
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const onSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			doc.exists() && setMessages(doc.data().message)
		})
		return () => {
			onSub()
		}
	}, [data.chatId])
	return (
		<div className='messages'>
			{messages?.map((value, index) => {
				return <Message key={index} message={value} />
			})}
		</div>
	)
}

export default Messages
