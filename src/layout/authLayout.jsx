import { Routes, Route, Navigate } from 'react-router-dom';

import  Login  from '../components/auth/login/login';
import  Register  from '../components/auth/register/register';
import { storeApp } from '../zustand/storeZustand';

function AccountLayout() {

    const auth = storeApp( state => state.auth) // useSelector(x => x.auth.value);

    if (auth) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export { AccountLayout };