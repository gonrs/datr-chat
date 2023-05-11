import React from 'react'
import '../style/home.css'
import { Link } from 'react-router-dom'
const Home = () => {
	return (
		<div className='home'>
			<h1>Home</h1>
			<Link className='link' to='/login'>
				Login
			</Link>
		</div>
	)
}

export default Home
