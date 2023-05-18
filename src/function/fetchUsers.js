import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export function fetchUsers(currentUser, setUsers) {
	if (currentUser) {
		// const docRef = doc(db, 'users', currentUser && currentUser.uid)
		// const docSnap = await getDoc(docRef)
		// let users = '#18147f'

		// if (docSnap.exists()) {
		// 	if (docSnap.data().theme) {
		// 		users = docSnap.data().theme
		// 	}
		// }
		// return users
		try {
			// let users = '#18147f'
			const unsubscribe = onSnapshot(
				doc(db, 'users', currentUser && currentUser.uid),
				doc => {
					if (doc.exists) {
						setUsers(doc.data().theme)
					}
				}
			)
			return unsubscribe
		} catch (err) {}
	}
}
