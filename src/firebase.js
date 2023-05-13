import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBHmynscB8b9bVmkGrBd1SjyyQtOJBoHrY',
	authDomain: 'datr-c02d6.firebaseapp.com',
	projectId: 'datr-c02d6',
	storageBucket: 'datr-c02d6.appspot.com',
	messagingSenderId: '51473972194',
	appId: '1:51473972194:web:584c08d6eb11f5db0ad7bb',
	measurementId: 'G-DQN4V6CZ2G',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const analytics = getAnalytics(app)
export const storage = getStorage()
export const db = getFirestore(app)
