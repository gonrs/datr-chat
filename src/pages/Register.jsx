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
	const [serverError, setServerError] = useState(false)
	const navigate = useNavigate()

	const [color, setColor] = useState('#18147f')

	async function handleRegister(e) {
		e.preventDefault()
		const displayName = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		const file = e.target[3].files[0]
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
							phoneNumber: color,
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
			setError(true)
			setServerError(true)
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
					<div className='register-theme'>
						<div
							style={
								color == '#18147f'
									? { border: '7px solid #18147f', backgroundColor: '#18147f' }
									: { border: '7px solid #18147f' }
							}
							onClick={() => {
								setColor('#18147f')
							}}
							className='theme'
						></div>
						<div
							style={
								color == '#238014'
									? { border: '7px solid #238014', backgroundColor: '#238014' }
									: { border: '7px solid #238014' }
							}
							onClick={() => {
								setColor('#238014')
							}}
							className='theme'
						></div>
						<div
							style={
								color == '#801414'
									? { border: '7px solid #801414', backgroundColor: '#801414' }
									: { border: '7px solid #801414' }
							}
							onClick={() => {
								setColor('#801414')
							}}
							className='theme'
						></div>
					</div>
					{error && !serverError ? (
						<span className='error'>Wrong correct info</span>
					) : (
						''
					)}
					{serverError ? (
						<span className='error'>This user is already logged in!</span>
					) : (
						''
					)}

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
