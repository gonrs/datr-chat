import React, { useContext, useState } from 'react'
import '../style/home.css'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { fetchUsers } from '../function/fetchUsers'
import { AuthContext } from '../context/AuthContext'
const Home = () => {
	const [color, setColor] = useState('')
	const { currentUser } = useContext(AuthContext)
	async function user() {
		const users = await fetchUsers(currentUser)
		setColor(users)
	}
	user()
	return (
		<div className='home'>
			<div className='home-container'>
				<Sidebar color={color} />
				<Chat color={color} />
			</div>
		</div>
	)
}

export default Home
