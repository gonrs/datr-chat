import React from 'react'

function File({ file, setImg }) {
	return (
		<div className='fileImg'>
			<div className='fileP'>
				<p onClick={() => setImg(null)}>Del</p>
			</div>
			<img src={file} alt='' />
		</div>
	)
}

export default File
