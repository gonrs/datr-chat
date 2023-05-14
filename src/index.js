import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './style/index.css'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<AuthContextProvider>
		<ChatContextProvider>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</ChatContextProvider>
	</AuthContextProvider>
)
