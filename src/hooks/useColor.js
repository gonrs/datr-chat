import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { fetchUsers } from '../function/fetchUsers'

export function useColor(currentUser) {
	try {
		const [color, setColor] = useState(null)
		// const { currentUser } = useContext(AuthContext)
		if (currentUser) {
			fetchUsers(currentUser, setColor)
		}
		let theme = 'standart'
		if (color == '#238014') {
			theme = 'green'
		}
		if (color == '#801414') {
			theme = 'red'
		}
		if (color == '#18147f') {
			theme = 'blue'
		}
		// console.log(theme)
		return { theme, color }
	} catch (err) {}
}
