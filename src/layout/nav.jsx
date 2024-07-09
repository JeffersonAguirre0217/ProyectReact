
import { storeApp } from '../zustand/storeZustand';
import { actionAuth } from '../zustand/authZustand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { actionMenu } from '../zustand/menuZustand';
import { ButtonDashboars, ContentNavbar, MenuMovil, Navbar } from './styledLayout';

function Nav() {
    const openAndCloseMenu = () => actionMenu.menuClick()
    const auth = storeApp(state => state.auth)
    const logout = () => actionAuth.logout();

    // only show nav when logged in
    if (!auth) return null;

    return (
        <ContentNavbar>
            <Navbar>
                <MenuMovil onClick={openAndCloseMenu} >
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </MenuMovil>
                <ButtonDashboars to="/">Dashboard</ButtonDashboars>
                <button onClick={logout}>Logout</button>
            </Navbar>
        </ContentNavbar>
    );
}

export { Nav };