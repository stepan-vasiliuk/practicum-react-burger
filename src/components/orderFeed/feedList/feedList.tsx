import feedListStyles from "./feedList.module.css";
import FeedItem from "../feedItem/feedItem";
import React from "react";
import {TFeedOrders} from "../../../utils/types";

type TFeedListProps = {
    orders: TFeedOrders;
}
export default function FeedList({orders}: TFeedListProps) {

    const ordersArray = orders.orders;


    return (
        <div className={feedListStyles.scroll_list}>
            {orders && ordersArray && ordersArray.length &&
                ordersArray.map(ordersArray => {
                    return (
                        <FeedItem
                            key={ordersArray._id}
                            order={ordersArray}
                        />
                    );
                })

            }
        </div>
    );
}