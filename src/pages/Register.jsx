import React, { useState } from 'react'
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
//
import { Link, useNavigate } from 'react-router-dom'
import '../style/reg.css'

const Register = () => {
	const [error, setError] = useState(false)
	const [Texterror, setTextError] = useState(false)
	const navigate = useNavigate()
	//
	// const image = ref(storage, 'happy.png')
	//
	async function handleRegister(e) {
		e.preventDefault()
		const displayName = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		// const file = e.target[3].files[0]
		if (displayName && email && password) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password)
				console.log('register success')
				// const storageRef = ref(storage, email)
				// const uploadTask = uploadBytesResumable(storageRef, image)
				await updateProfile(res.user, {
					displayName,
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/datr-c02d6.appspot.com/o/happy.png?alt=media&token=e3b0a539-2153-4c6b-b349-38e60968dce5',
				})
				console.log('profile success')
				await setDoc(doc(db, 'users', res.user.uid), {
					uid: res.user.uid,
					displayName,
					email,
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/datr-c02d6.appspot.com/o/happy.png?alt=media&token=e3b0a539-2153-4c6b-b349-38e60968dce5',
					theme: '#24242F',
				})
				console.log('add users success')
				await setDoc(doc(db, 'userChats', res.user.uid), {})
				console.log('add userChat success')
				navigate('/')
				// 	uploadTask.on(
				// 		error => {
				// 			console.log(error)
				// 			console.log('upload error')
				// 			setError(true)
				// 			setTextError('Используте другую картинку!')
				// 		},
				// 		() => {
				// 			getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
				// 				await updateProfile(res.user, {
				// 					displayName,
				// 					photoURL: downloadURL,
				// 				})
				// 				console.log('profile success')
				// 				await setDoc(doc(db, 'users', res.user.uid), {
				// 					uid: res.user.uid,
				// 					displayName,
				// 					email,
				// 					photoURL: downloadURL,
				// 					theme: '#24242F',
				// 				})
				// 				console.log('add users success')
				// 				await setDoc(doc(db, 'userChats', res.user.uid), {})
				// 				console.log('add userChat success')
				// 				navigate('/')
				// 			})
				// 		}
				// 	)
			} catch (err) {
				console.log(err)
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
			// if (!file) {
			// 	setTextError('Выберете картинку!')
			// }
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
					{/* <input
						type='file'
						name='avatar'
						id='file'
						style={{ display: 'none' }}
					/>
					<label htmlFor='file' className='form-file'>
						<img className='img' src={img1} alt='' />
						Add avatar
					</label> */}
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
