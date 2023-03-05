import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import AuthContext from './contexts/AuthContext'
import { useContext, useEffect } from 'react'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Upload from './pages/Upload'

export default function Router() {
	const { loggedIn, imagesUploaded } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Routes>
                {loggedIn === false && <Route path='/' element={<SignIn />} />}
                {loggedIn === true && imagesUploaded === false && <Route path='/' element={<Upload />} />}
                {loggedIn === true && imagesUploaded === true && <Route path='/' element={<Home />} />}
            </Routes>
        </BrowserRouter>
    )
}
