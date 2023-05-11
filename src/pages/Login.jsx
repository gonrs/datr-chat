import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/reg.css'

const Login = () => {
	const [error, setError] = useState(false)
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async event => {
		event.preventDefault()
		navigate('/')
	}
	return (
		<form onSubmit={handleSubmit} className='formContainer'>
			<div className={error ? 'formWrapper formWrapperE' : 'formWrapper'}>
				<span className='logo'>Chat</span>
				<span className='title'>Login</span>
				<div className='form'>
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
					{error ? (
						<span className='error'>Wrong true login or password</span>
					) : (
						''
					)}
					<button>Sing up</button>
				</div>
				<p>
					Yo dot`t have account?{' '}
					<Link className='form-link' to='/register'>
						Register
					</Link>
				</p>
			</div>
		</form>
	)
}

export default Login
