import React from 'react'

function Navbar() {
	return (
		<div className='navbar'>
			<span className='navbar-logo'>Datr</span>
			<div className='user'>
				<img src='' alt='' />
				<span>John</span>
				<button>logout</button>
			</div>
		</div>
	)
}

export default Navbar
