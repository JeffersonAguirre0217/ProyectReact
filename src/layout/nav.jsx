import { NavLink } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';

//import { authActions } from '../redux/authSlice';
import { storeApp } from '../zustand/storeZustand';
import { actionAuth } from '../zustand/authZustand';

function Nav() {
    
    const auth = storeApp( state => state.auth)
    //const dispatch = useDispatch();
    const logout = () => actionAuth.logout();

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Dashboard</NavLink>
                
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}

export { Nav };