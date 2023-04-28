import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {IUser} from "../utils/types";

type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: JSX.Element;
}

type TOnlyUnAuthProps = {
    component: JSX.Element;
}
function ProtectedRoute({onlyUnAuth = false, component}: TProtectedRouteProps) {
    // @ts-ignore
    const isAuthChecked: boolean = useSelector(state => state.userReducer.isAuthChecked);
    // @ts-ignore
    const user: IUser = useSelector(state => state.userReducer.user);
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
export const OnlyUnAuth = ({component}: TOnlyUnAuthProps) => <ProtectedRoute onlyUnAuth={true} component={component} />

