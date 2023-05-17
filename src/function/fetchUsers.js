import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const fetchUsers = async currentUser => {
	const docRef = doc(db, 'users', currentUser.uid && currentUser.uid)
	const docSnap = await getDoc(docRef)

	let users = '#18147f'

	if (docSnap.exists()) {
		users = docSnap.data().phoneNumber
	}

	return users
}
