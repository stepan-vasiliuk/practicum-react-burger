import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRoute({onlyUnAuth = false, component, rest}) {
    const isAuthChecked = useSelector(state => state.userReducer.isAuthChecked);
    const user = useSelector(state => state.userReducer.user);
    const location = useLocation();

    // if (!isAuthChecked) {
    //     //TODO: Make a pre-loader
    //     return null;
    // }

    if (onlyUnAuth && user) {
        console.log('Пользователь авторизован. Попытка перехода по маршруту неавторизованных');
        console.log('location>>>', location, '\n location state>>>', location.state);
        const {from} = location.state || {from: {pathname: '/'}};
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        console.log('Переход по маршруту для авторизованных && !user');
        console.log('location, которая будет записана в from: ', location);
        return <Navigate to='/login' state={{from: location}}/>
    }

    return component({...rest});
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = (props) => <ProtectedRoute onlyUnAuth={true}{...props} />
