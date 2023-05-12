import React from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'

function Input() {
	return (
		<div className='chatInput'>
			<input type='text' placeholder='Type something' />
			<div className='send'>
				<img src={Attach} alt='' />
				<input type='file' style={{ display: 'none' }} />
				<label htmlFor='file'>
					<img src={Img} alt='' />
				</label>
				<button>Send</button>
			</div>
		</div>
	)
}

export default Input
