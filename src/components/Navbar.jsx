import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth, db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { useColor } from '../hooks/useColor'

function Navbar() {
	const { currentUser } = useContext(AuthContext)
	const [showSet, setShowSet] = useState(false)
	const [showSettings, setshowSettings] = useState(false)
	//
	const { color } = useColor(currentUser)
	// const [color, setColor] = useState('#18147f')
	async function toggleTheme(colors) {
		// setColor(colors)
		await updateDoc(doc(db, 'users', currentUser && currentUser.uid), {
			theme: colors,
		})
	}
	//
	return (
		<div className='navbar'>
			<div className='user'>
				<img src={currentUser.photoURL} alt='' />
				<span>{currentUser.displayName}</span>
				<span>{currentUser.phoneNumber}</span>
			</div>
			<div className='userSet'>
				<button
					onClick={() => {
						setShowSet(!showSet)
						setshowSettings(false)
					}}
					className='navbar-logo'
				>
					Datr
				</button>
				{showSet && (
					<div className='navbarSet'>
						<button onClick={() => signOut(auth)}>Logout</button>
						<button
							onClick={() => {
								setShowSet(false)
								setshowSettings(true)
							}}
						>
							Settings
						</button>
					</div>
				)}
				{showSettings && (
					<div className='navbarSettings'>
						<div className='navbarSettingsDiv'>
							<button onClick={() => setshowSettings(false)}>Close</button>
							<div className='register-theme'>
								<div
									style={
										color === '#18147f'
											? {
													border: '7px solid #18147f',
													backgroundColor: '#18147f',
											  }
											: { border: '7px solid #18147f' }
									}
									onClick={() => {
										toggleTheme('#18147f')
									}}
									className='theme'
								></div>
								<div
									style={
										color === '#238014'
											? {
													border: '7px solid #238014',
													backgroundColor: '#238014',
											  }
											: { border: '7px solid #238014' }
									}
									onClick={() => {
										toggleTheme('#238014')
									}}
									className='theme'
								></div>
								<div
									style={
										color === '#801414'
											? {
													border: '7px solid #801414',
													backgroundColor: '#801414',
											  }
											: { border: '7px solid #801414' }
									}
									onClick={() => {
										toggleTheme('#801414')
									}}
									className='theme'
								></div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
