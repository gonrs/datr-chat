import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

function Input() {
	const [text, setText] = useState('')
	const [img, setImg] = useState(null)

	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)
	async function handleClick(e) {
		e.preventDefault()
		if (img) {
			const storageRef = ref(storage, uuid())

			const uploadTask = uploadBytesResumable(storageRef, img)
			uploadTask.on(
				error => {
					console.log(error)
					console.log('upload error')
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
						await updateDoc(doc(db, 'chats', data.chatId), {
							message: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						})
					})
				}
			)
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				message: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			})
		}
		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		})
		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		})
		setText('')
		setImg(null)
	}
	return (
		<form onSubmit={handleClick} className='chatInput'>
			<input
				type='text'
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder='Type something'
			/>
			<div className='send'>
				<input
					type='file'
					onChange={e => setImg(e.target.files[0])}
					style={{ display: 'none' }}
					id='file'
				/>
				<label htmlFor='file'>
					<img src={Img} alt='' />
				</label>
				<button type='submit'>Send</button>
			</div>
		</form>
	)
}

export default Input
