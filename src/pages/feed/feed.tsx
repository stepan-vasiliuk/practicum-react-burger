import orderFeedStyles from "./feed.module.css";
import React, {useEffect} from "react";
import FeedDashBoard from "../../components/orderFeed/feedDashBoard/feedDashBoard";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";
import {feedConnect, feedDisconnect} from "../../services/actions/wsFeedActions";
import FeedList from "../../components/orderFeed/feedList/feedList";

export default function Feed() {
    const URL = "wss://norma.nomoreparties.space/orders/all";

    const dispatch = useTypedDispatch();
    const orders = useTypedSelector(state => state.wsFeedReducer.orders);

    useEffect(() => {
        dispatch(feedConnect(URL));
        return () => {
            dispatch(feedDisconnect());
        };
    }, []);



    return (
        <>
            {orders?
                <div className={orderFeedStyles.grid_container}>
                    <section className={orderFeedStyles.left_board}>
                        <h3 className="text text_type_main-large mt-10">Лента заказов</h3>
                        <FeedList
                            orders = {orders}
                        />
                    </section>
                    <section className={orderFeedStyles.right_board}>
                        <FeedDashBoard
                            orders={orders}
                        />
                    </section>
                </div>
            :
                <h3 className={`text text_type_main-large`}>Заказы отсутствуют</h3>
            }
        </>
    );
}