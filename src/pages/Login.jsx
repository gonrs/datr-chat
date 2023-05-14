import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/reg.css'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
	const [error, setError] = useState(false)
	const [serverError, setServerError] = useState(false)
	const navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()
		const email = e.target[0].value
		const password = e.target[1].value
		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (err) {
			console.log('big error')
			setError(true)
			setServerError(true)
		}
	}
	return (
		<form onSubmit={handleSubmit} className='formContainer'>
			<div className={error ? 'formWrapper formWrapperE' : 'formWrapper'}>
				<span className='logo'>Chat</span>
				<span className='title'>Login</span>
				<div className='form'>
					<input type='email' className='form-input' placeholder='email' />
					<input
						type='password'
						className='form-input'
						placeholder='password'
					/>
					{error || serverError ? (
						<span className='error'>Wrong true login or password</span>
					) : (
						''
					)}
					<button>Sing up</button>
				</div>
				<p>
					You don`t have account?{' '}
					<Link className='form-link' to='/register'>
						Register
					</Link>
				</p>
			</div>
		</form>
	)
}

export default Login
