import React, { useContext } from 'react'
import '../style/home.css'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { AuthContext } from '../context/AuthContext'
import { useColor } from '../hooks/useColor'
const Home = () => {
	// const [color, setColor] = useState('')
	const { currentUser } = useContext(AuthContext)
	// async function user() {
	// 	const users = await fetchUsers(currentUser)
	// 	setColor(users)
	// }
	// user()
	const { theme } = useColor(currentUser)
	return (
		<div className={`home ${theme}`}>
			<div className='home-container'>
				<Sidebar />
				<Chat />
			</div>
		</div>
	)
}

export default Home
