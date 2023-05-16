import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

function Message({ message }) {
	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)
	const ref = useRef()
	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' })
	}, [message])
	// let h = Math.round(message.date.seconds / 60 / 60 / 24)
	// let m = Math.round(message.date.seconds / 60 / 60)
	return (
		<div
			ref={ref}
			className={`message ${message.senderId === currentUser.uid && 'owner'}`}
		>
			<div className='messageInfo'>
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt=''
				/>
				{/* <span>{`${h}:${m}`}</span> */}
				<span>now</span>
			</div>
			<div className='messageContent '>
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt='' />}
			</div>
		</div>
	)
}

export default Message
