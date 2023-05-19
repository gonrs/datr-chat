import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../style/home.css'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useColor } from '../hooks/useColor'

function Settings() {
	const { currentUser } = useContext(AuthContext)
	const [file, setFile] = useState(null)
	const bgFile =
		file && typeof file !== 'string'
			? `${URL.createObjectURL(file)}`
			: `${currentUser.photoURL}`
	//
	async function handleSubmit(e) {
		e.preventDefault()
		if (file) {
			try {
				const storageRef = ref(storage, currentUser.displayName)
				const uploadTask = uploadBytesResumable(storageRef, file)
				uploadTask.on(
					error => {
						console.log(error)
						console.log('upload error')
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
							await updateDoc(
								doc(db, 'users', currentUser && currentUser.uid),
								{
									photoURL: downloadURL,
								}
							)
							navigate('/')
						})
					}
				)
			} catch (err) {
				console.log(err)
			}
		}
	}
	//
	const navigate = useNavigate()
	//
	const { color } = useColor(currentUser)
	async function toggleTheme(colors) {
		await updateDoc(doc(db, 'users', currentUser && currentUser.uid), {
			theme: colors,
		})
	}
	const { theme } = useColor(currentUser)
	return (
		<div className={`settingsWrap ${theme}`}>
			<div className='containerSet'>
				<h1>Настройки профиля</h1>
				<form onSubmit={handleSubmit} className='settingsForm'>
					<div onClick={() => navigate('/')} className='settingsBack'>
						Back
					</div>
					<input
						type='file'
						name='avatar'
						id='file'
						style={{ display: 'none' }}
						onChange={e => {
							const selectedFile = e.target.files[0]
							setFile(selectedFile)
						}}
					/>
					<label htmlFor='file' className='settingsFile'>
						<img src={bgFile} className='settingsImg' alt='' />
					</label>

					<button type='submite'> Save</button>
				</form>
				<div className='styles'>
					<h1>Настройки темы</h1>
					<div className='register-theme'>
						<div
							style={
								color === '#18147f'
									? {
											border: '7px solid #18147f',
											backgroundColor: '#18147f',
									  }
									: { border: '7px solid #18147f' }
							}
							onClick={() => {
								toggleTheme('#18147f')
							}}
							className='theme'
						></div>
						<div
							style={
								color === '#238014'
									? {
											border: '7px solid #238014',
											backgroundColor: '#238014',
									  }
									: { border: '7px solid #238014' }
							}
							onClick={() => {
								toggleTheme('#238014')
							}}
							className='theme'
						></div>
						<div
							style={
								color === '#801414'
									? {
											border: '7px solid #801414',
											backgroundColor: '#801414',
									  }
									: { border: '7px solid #801414' }
							}
							onClick={() => {
								toggleTheme('#801414')
							}}
							className='theme'
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
