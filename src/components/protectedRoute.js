import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRoute({onlyUnAuth = false, component}) {
    const isAuthChecked = useSelector(state => state.userReducer.isAuthChecked);
    const user = useSelector(state => state.userReducer.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: '/'}};
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}) => <ProtectedRoute onlyUnAuth={true} component={component} />

