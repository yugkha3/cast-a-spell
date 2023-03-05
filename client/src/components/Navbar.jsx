import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";


export const Navbar = () => {
	const { userData, getLoggedIn }= useContext(AuthContext)
    const doLogOut = async () => {
        await fetch(`${import.meta.env.VITE_BASE_URL_SERVER}/logout`, {
            method: 'GET',
            credentials: 'include'
        });
        await getLoggedIn();
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl font-manrope text-neutral">🪄</a>
            </div>
            {userData.isTrained === true && <div className="badge badge-success m-2">Trained</div>}
            {userData.isTrained === false && <div className="badge badge-error m-2">Not Trained</div>}    

            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={userData.picture} referrerPolicy='no-referrer' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={doLogOut}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}