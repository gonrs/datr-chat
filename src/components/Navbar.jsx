import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
	const { currentUser } = useContext(AuthContext)
	const [showSet, setShowSet] = useState(false)
	return (
		<div className='navbar'>
			<div className='user'>
				<img src={currentUser.photoURL} alt='' />
				<span>{currentUser.displayName}</span>
			</div>
			<div className='userSet'>
				<button
					onClick={() => {
						setShowSet(!showSet)
					}}
					className='navbar-logo'
				>
					Datr
				</button>
				{showSet && (
					<div className='navbarSet'>
						<button onClick={() => signOut(auth)}>Logout</button>
						<button onClick={() => {}}>Settings</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
