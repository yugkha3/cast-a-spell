import { AuthContextProvider } from './contexts/AuthContext'
import Router from './Router'
import { Toaster } from 'react-hot-toast'
function App() {
	return (
			<AuthContextProvider>
				<Toaster />
				<Router />
			</AuthContextProvider>
	)
}

export default App
