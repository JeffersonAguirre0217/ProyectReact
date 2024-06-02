import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../components/shared/helper/history';

function PrivateRoute() {
    const auth = true;// useSelector(x => x.auth.value);

    if (!auth) {
        // not logged redirect to login
        return (<Navigate to="/login" state={{ from: history.location }} />);
    }

    return (<Outlet />);
}

export { PrivateRoute };
