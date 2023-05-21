import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

function Message({ message, openImg }) {
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
				<span>{message?.date}</span>
			</div>
			<div className='messageContent '>
				<p className={`${!message.text && 'messageContentP'}`}>
					{message?.text}
				</p>
				{message?.img && (
					<img
						onClick={() => {
							openImg(message.img)
						}}
						style={{ cursor: 'pointer' }}
						src={message.img}
						alt=''
					/>
				)}
			</div>
		</div>
	)
}

export default Message
