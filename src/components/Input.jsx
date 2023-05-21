import React, { useContext, useRef, useState } from 'react'
import Img from '../img/img.png'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import File from './File'

function Input() {
	const [text, setText] = useState('')
	const [img, setImg] = useState(null)
	const RefFile = useRef(null)
	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)
	const currentTime = new Date().toLocaleTimeString()

	async function handleClick(e) {
		e.preventDefault()
		if (img || text !== '') {
			if (img && text !== '') {
				try {
					// const storageRef = ref(storage, uuid())
					const storageRef = ref(storage, `mes+${uuid()}`)
					const uploadTask = uploadBytesResumable(storageRef, img)
					uploadTask.on(
						error => {
							console.log(error)
							console.log('upload error')
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								async downloadURL => {
									await updateDoc(doc(db, 'chats', data.chatId), {
										message: arrayUnion({
											id: uuid(),
											text,
											senderId: currentUser.uid,
											date: currentTime,
											img: downloadURL,
										}),
									})
								}
							)
						}
					)
				} catch (e) {
					console.log(e)
				}
			}
			if (!img && text !== '') {
				await updateDoc(doc(db, 'chats', data.chatId), {
					message: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: currentTime,
					}),
				})
			}
			if (img && text === '') {
				try {
					// const storageRef = ref(storage, uuid())
					const storageRef = ref(storage, `mes+${uuid()}`)
					const uploadTask = uploadBytesResumable(storageRef, img)
					uploadTask.on(
						error => {
							console.log(error)
							console.log('upload error')
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								async downloadURL => {
									await updateDoc(doc(db, 'chats', data.chatId), {
										message: arrayUnion({
											id: uuid(),
											text: '',
											senderId: currentUser.uid,
											date: currentTime,
											img: downloadURL,
										}),
									})
								}
							)
						}
					)
				} catch (e) {
					console.log(e)
				}
			}
			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.lastMessage']: {
					text: text !== '' ? text : 'img',
				},
				[data.chatId + '.date']: currentTime,
			})
			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId + '.lastMessage']: {
					text: text !== '' ? text : 'img',
				},
				[data.chatId + '.date']: currentTime,
			})
			setText('')
			setImg(null)
		}
	}
	function setRef() {
		console.log('clear')
		RefFile.current.value = null
		setImg(RefFile.current.value)
	}
	const BgFile = img ? `${URL.createObjectURL(img)}` : ''
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
					ref={RefFile}
					onChange={e => setImg(e.target.files[0])}
					style={{ display: 'none' }}
					id='file'
				/>
				<label htmlFor='file'>
					<img src={Img} alt='' />
				</label>
				<button type='submit'>Send</button>
				{img && <File file={BgFile} setRef={setRef} />}
			</div>
		</form>
	)
}

export default Input
