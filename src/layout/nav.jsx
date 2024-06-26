import { NavLink } from 'react-router-dom';
import { storeApp } from '../zustand/storeZustand';
import { actionAuth } from '../zustand/authZustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { actionMenu } from '../zustand/menuZustand';

function Nav() {
    const openAndCloseMenu = () => actionMenu.menuClick()
    const auth = storeApp(state => state.auth)
    const logout = () => actionAuth.logout();

    // only show nav when logged in
    if (!auth) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <button onClick={openAndCloseMenu} className="btn btn-link nav-item nav-link  sm:invisible"><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>

                <NavLink to="/" className="nav-item nav-link">Dashboard</NavLink>

                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}

export { Nav };