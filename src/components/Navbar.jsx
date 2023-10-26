import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth, db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { useColor } from '../hooks/useColor'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'

function Navbar() {
	const { currentUser } = useContext(AuthContext)
	const [showSet, setShowSet] = useState(false)
	const [showSettings, setshowSettings] = useState(false)
	//
	const { color } = useColor(currentUser)
	async function toggleTheme(colors) {
		await updateDoc(doc(db, 'users', currentUser && currentUser.uid), {
			theme: colors,
		})
	}
	//
	const navigate = useNavigate()
	const { dispatch } = useContext(ChatContext)
	return (
		<div className='navbar'>
			<a
				href='https://github.com/gonrs?tab=repositories'
				className='navbarLink'
				target='_blnack'
			>
				Author
			</a>
			<div className='userSet'>
				<div
					onClick={() => {
						setShowSet(!showSet)
						setshowSettings(false)
					}}
					style={{ cursor: 'pointer' }}
					className='user'
				>
					<span>{currentUser.displayName}</span>
					<img src={currentUser.photoURL} alt='' />
				</div>
				{showSet && (
					<div className='navbarSet'>
						<button
							onClick={() => {
								signOut(auth)
								dispatch({ type: 'CHENGE_USER', payload: {} })
							}}
						>
							Logout
						</button>
						<button onClick={() => navigate('/settings')}>Settings</button>
						{/* <button
							onClick={() => {
								setShowSet(false)
								setshowSettings(true)
							}}
						>
							Theme
						</button> */}
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
