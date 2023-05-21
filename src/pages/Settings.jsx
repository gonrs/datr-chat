import React, { useState } from 'react'
// import { AuthContext } from '../context/AuthContext'
import '../style/home.css'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useColor } from '../hooks/useColor'
import { updateProfile } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

function Settings() {
	// const { currentUser } = useContext(AuthContext)
	// const { data } = useContext(ChatContext)
	const [currentUser] = useAuthState(auth)
	const [value, setValue] = useState(currentUser.displayName)
	const [file, setFile] = useState(null)
	const bgFile =
		file && typeof file !== 'string'
			? `${URL.createObjectURL(file)}`
			: `${currentUser.photoURL}`
	//
	async function handleSubmit(e) {
		e.preventDefault()
		if (value !== currentUser.displayName || file !== null) {
			try {
				const storageRef = ref(storage, currentUser.email)
				const uploadTask = uploadBytesResumable(storageRef, file)
				uploadTask.on(
					error => {
						console.log(error)
						console.log('upload error')
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
							await updateProfile(currentUser, {
								displayName: value,
								photoURL: downloadURL,
							})
							await updateDoc(doc(db, 'users', currentUser?.uid), {
								displayName: value,
								photoURL: downloadURL,
							})
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
					<input
						type='text'
						className='settingsInput'
						placeholder='Enter new Name..'
						value={value}
						onChange={e => {
							setValue(e.target.value)
						}}
					/>
					<button type='submite'> Save</button>
				</form>
				<div className='styles'>
					<h1>Настройки темы</h1>
					<div className='register-theme'>
						<div
							style={
								color === '#24242F'
									? {
											border: '7px solid #3A3A47',
											backgroundColor: '#3A3A47',
									  }
									: { backgroundColor: '#3A3A47', border: '7px solid #C4C4C6' }
							}
							onClick={() => {
								toggleTheme('#24242F')
							}}
							className='theme'
						></div>
						<div
							style={
								color === '#C4C4C6'
									? {
											border: '7px solid #FDFDFD',
											backgroundColor: '#FDFDFD',
									  }
									: { backgroundColor: '#FDFDFD', border: '7px solid #24242F' }
							}
							onClick={() => {
								toggleTheme('#C4C4C6')
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
