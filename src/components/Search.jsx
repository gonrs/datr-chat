import React, { useContext, useState } from 'react'
import {
	where,
	collection,
	query,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	serverTimestamp,
	doc,
} from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
function Search() {
	const [userName, setUserName] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)
	const { currentUser } = useContext(AuthContext)

	async function handleSearch() {
		console.log('serach...')

		try {
			const q = query(
				collection(db, 'users'),
				where('displayName', '==', userName)
			)
			const queruSnapshot = await getDocs(q)
			queruSnapshot.forEach(data => {
				setUser(data.data())
			})
			console.log(user)
		} catch (err) {
			setErr(true)
			setUser(null)
		}
	}

	function hendleKey(e) {
		e.code == 'Enter' && handleSearch()
	}

	async function handleSelect() {
		//
		console.log(0)
		const commbinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid
		try {
			console.log(1)
			const res = await getDoc(doc(db, 'chats', commbinedId))
			if (!res.exists()) {
				console.log(2)
				await setDoc(doc(db, 'chats', commbinedId), { message: [] })
				//
				console.log(3)
				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[commbinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[commbinedId + '.date']: serverTimestamp(),
				})
				console.log(4)
				await updateDoc(doc(db, 'userChats', user.uid), {
					[commbinedId + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[commbinedId + '.date']: serverTimestamp(),
				})
				console.log(5)
			}
		} catch (err) {
			console.log(err)
		}
		setUser(null)
		setUserName('')
		//
	}
	return (
		<div className='search'>
			<div className='searchForm'>
				<input
					type='text'
					value={userName}
					onKeyDown={hendleKey}
					onChange={e => {
						setUserName(e.target.value)
						// handleSearch()
					}}
					name=''
					id=''
					placeholder='Find usesrs'
				/>
			</div>
			{err && <span>User not found!</span>}
			{/* {!user && userName && <span>User not found!</span>} */}
			{user && userName && user.displayName == userName ? (
				<div onClick={handleSelect} className='userChat'>
					<img src={user.photoURL} alt='' />
					<div className='userChatInfo'>
						<span>{user.displayName}</span>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Search
