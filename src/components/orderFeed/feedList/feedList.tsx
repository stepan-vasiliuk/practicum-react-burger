import feedListStyles from "./feedList.module.css";
import FeedItem from "../feedItem/feedItem";
import React, {useEffect} from "react";
import {TFeedOrders} from "../../../utils/types";

type TFeedListProps = {
    orders: TFeedOrders;
}
export default function FeedList({orders}: TFeedListProps) {

    useEffect(() => {
        console.log(orders);
    }, []);

    const ordersArray = orders.orders;

    return (
        <div className={feedListStyles.scroll_list}>
            {orders && ordersArray && ordersArray.length > 0 &&
                ordersArray.map(order => {
                    return (
                        <FeedItem
                            key={order._id}
                            order={order}
                        />
                    );
                })

            }
        </div>
    );
}