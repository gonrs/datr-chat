import React, { useContext, useState } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

function Chat() {
	const { data } = useContext(ChatContext)
	console.log(data.user)
	return (
		<div className='chat'>
			{data.user.uid ? (
				<>
					<div className='chatnInfo'>
						{data.user.photoURL ? (
							<img className='chat-info-img' src={data.user?.photoURL} alt='' />
						) : null}
						<span>{data.user?.displayName}</span>
						<div className='chatIcons'>
							<img src={Cam} alt='' />
							<img src={Add} alt='' />
							<img src={More} alt='' />
						</div>
					</div>
					<Messages />
					<Input />
				</>
			) : (
				<div className='messagesEd'>
					<h2>Welkom to Datr!</h2>
				</div>
			)}
		</div>
	)
}

export default Chat
