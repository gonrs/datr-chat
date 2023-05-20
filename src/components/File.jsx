import React from 'react'

function File({ file, setRef }) {
	if (file) {
		console.log('q')
	}
	return (
		<div className='fileImg'>
			<div className='fileP'>
				<p
					onClick={() => {
						console.log('qwe')
						setRef()
					}}
				>
					Del
				</p>
			</div>
			<img src={file} alt='' />
		</div>
	)
}

export default File
