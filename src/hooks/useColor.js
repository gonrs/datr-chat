import { useState } from 'react'
import { fetchUsers } from '../function/fetchUsers'

export function useColor(currentUser) {
	try {
		const [color, setColor] = useState(null)
		// const { currentUser } = useContext(AuthContext)
		if (currentUser) {
			fetchUsers(currentUser, setColor)
		}
		let theme = 'standart'
		if (color === '#24242F') {
			theme = 'dark'
		}
		if (color === '#C4C4C6') {
			theme = 'white'
		}
		// console.log(theme)
		return { theme, color }
	} catch (err) {}
}
