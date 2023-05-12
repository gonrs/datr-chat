import React from 'react'
import '../style/home.css'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
const Home = () => {
	return (
		<div className='home'>
			<div className='home-container'>
				<Sidebar />
				<Chat />
			</div>
		</div>
	)
}

export default Home
