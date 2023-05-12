import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
	apiKey: 'AIzaSyBHmynscB8b9bVmkGrBd1SjyyQtOJBoHrY',
	authDomain: 'datr-c02d6.firebaseapp.com',
	projectId: 'datr-c02d6',
	storageBucket: 'datr-c02d6.appspot.com',
	messagingSenderId: '51473972194',
	appId: '1:51473972194:web:584c08d6eb11f5db0ad7bb',
	measurementId: 'G-DQN4V6CZ2G',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(firebaseConfig)
const analytics = getAnalytics(app)
