import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
//
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../img/form-file-icon.png'
import '../style/reg.css'

const Register = () => {
	const [error, setError] = useState(false)
	const [Texterror, setTextError] = useState(false)
	const navigate = useNavigate()

	async function handleRegister(e) {
		e.preventDefault()
		const displayName = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const file = e.target[3].files[0]
		if (displayName && email && password && file) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password)
				console.log('register success')
				const storageRef = ref(storage, displayName)
				const uploadTask = uploadBytesResumable(storageRef, file)

				uploadTask.on(
					error => {
						console.log(error)
						console.log('upload error')
						setError(true)
						setTextError('Используте другую картинку!')
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							})
							console.log('profile success')
							await setDoc(doc(db, 'users', res.user.uid), {
								uid: res.user.uid,
								displayName,
								email,
								photoURL: downloadURL,
								theme: '#18147f',
							})
							console.log('add users success')
							await setDoc(doc(db, 'userChats', res.user.uid), {})
							console.log('add userChat success')
							navigate('/')
						})
					}
				)
			} catch (err) {
				console.log('big error')
			}
		} else {
			setError(true)
			if (!displayName) {
				setTextError('Введите имя!')
			}
			if (!email) {
				setTextError('Введите почту!')
			}
			if (!password) {
				setTextError('Введите пароль!')
			}
			if (!file) {
				setTextError('Выберете картинку!')
			}
		}
	}
	return (
		<form onSubmit={handleRegister} className='formContainer'>
			<div className={error ? 'formWrapper formWrapperE' : 'formWrapper'}>
				<span className='logo'>Chat</span>
				<span className='title'>Register</span>
				<div className='form'>
					<input type='text' className='form-input' placeholder='username' />
					<input type='email' className='form-input' placeholder='email' />
					<input
						type='password'
						className='form-input'
						placeholder='password'
					/>
					<input
						type='file'
						name='avatar'
						id='file'
						style={{ display: 'none' }}
					/>
					<label htmlFor='file' className='form-file'>
						<img className='img' src={img1} alt='' />
						Add avatar
					</label>
					{error ? <span className='error'>{Texterror}</span> : ''}

					<button>Sing up</button>
				</div>
				<p>
					You do have account?{' '}
					<Link className='form-link' to='/login'>
						Login
					</Link>
				</p>
			</div>
		</form>
	)
}

export default Register
