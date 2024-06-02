import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import  Login  from '../components/auth/login/login';
import  Register  from '../components/auth/register/register';

function AccountLayout() {

    const auth = useSelector(x => x.auth.value);

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