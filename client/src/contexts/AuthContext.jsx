import { createContext, useEffect, useState } from "react"
const AuthContext = createContext();

function AuthContextProvider(props) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [imagesUploaded, setImagesUploaded] = useState(false);
	const [userData, setUserData] = useState({ name: '', email: '', picture: '' });

	const getLoggedIn = async () => {
		const loggedInRes = await fetch(`${import.meta.env.VITE_BASE_URL_SERVER}/loggedin`, {
			method: 'GET',
			credentials: 'include',
		});
		const data = await loggedInRes.json();
		setLoggedIn(data.isVerified);
		setUserData({ name: data.name, email: data.email, picture: data.picture, username: data.username, isTrained: data.isTrained });
		if (data.images.length !== 0) {
			setImagesUploaded(true);
		}
	}
	useEffect(() => {
		getLoggedIn();
	}, [])
	return (<AuthContext.Provider value={{ loggedIn, getLoggedIn, userData, imagesUploaded, setImagesUploaded }}>
		{props.children}
	</AuthContext.Provider>
	)
}

export default AuthContext;
export { AuthContextProvider }