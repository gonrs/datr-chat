import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../img/form-file-icon.png'
import '../style/reg.css'

const Register = () => {
	const [error, setError] = useState(false)
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [pass2, setPass2] = useState('')
	const navigate = useNavigate()
	async function handleRegister() {
		navigate('/')
	}
	return (
		<form onSubmit={handleRegister} className='formContainer'>
			<div className={error ? 'formWrapper formWrapperE' : 'formWrapper'}>
				<span className='logo'>Chat</span>
				<span className='title'>Register</span>
				<div className='form'>
					<input type='text' className='form-input' placeholder='username' />
					<input
						value={email}
						type='email'
						className='form-input'
						placeholder='email'
						onChange={e => setEmail(e.target.value)}
					/>

					<input
						value={pass}
						type='password'
						className='form-input'
						placeholder='password'
						onChange={e => setPass(e.target.value)}
					/>
					<input
						value={pass}
						type='password'
						className='form-input'
						placeholder='password'
						onChange={e => setPass(e.target.value)}
					/>
					<label htmlFor='file' className='form-file'>
						<img className='img' src={img1} alt='' />
						Add avatar
					</label>
					{error ? (
						<span className='error'>Wrong true login or password</span>
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
