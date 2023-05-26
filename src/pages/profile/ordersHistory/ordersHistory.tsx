import {useEffect} from "react";
import {wsOrderConnect, wsOrderDisconnect} from "../../../services/actions/wsOrderActions";
import {useTypedDispatch, useTypedSelector} from "../../../hooks/hooks";
import styles from "./ordersHistory.module.css";
import FeedList from "../../../components/orderFeed/feedList/feedList";
import {checkUserAuth} from "../../../services/actions";

export default function OrdersHistory() {
    const accessTokenWithBearer = localStorage.getItem("accessToken");
    const accessToken = accessTokenWithBearer!.substring(accessTokenWithBearer!.lastIndexOf(" ") + 1);

    const URL = "wss://norma.nomoreparties.space/orders";

    const dispatch = useTypedDispatch();
    const orders = useTypedSelector(state => state.wsOrderReducer.orders);

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    useEffect(() => {
        dispatch(wsOrderConnect(`${URL}?token=${accessToken}`));
        return () => {
            dispatch(wsOrderDisconnect());
        };
    },[]);



    return (
        <>
            {orders ?
                <div className={styles.component_wrapper}>
                    <FeedList orders={orders}/>
                </div>
                :
                <div className={styles.component_wrapper}>
                    <h2 className={`text text_type_main-large`}>Заказы отсутствуют</h2>
                </div>
            }
        </>
    );
}