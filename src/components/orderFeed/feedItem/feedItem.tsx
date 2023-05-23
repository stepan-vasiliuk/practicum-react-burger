import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import itemStyles from "./feedItem.module.css";
import {IIngredient, TFeedDetailedOrder} from "../../../utils/types";
import {useTypedSelector} from "../../../hooks/hooks";
import {Link, useLocation} from "react-router-dom";

type TFeedItemProps = {
    order: TFeedDetailedOrder;
}
export default function FeedItem({order}: TFeedItemProps) {

    const ingredients = useTypedSelector(state => state.dataReducer.data);


    function getFiltered() {
        let filteredArray: Array<IIngredient> = [];
        order.ingredients.forEach(item => {
            ingredients.forEach(ingredient => {
                if (ingredient._id === item) {
                    filteredArray.push(ingredient);
                }
            });
        });
        return filteredArray;
    }

    const filtered = getFiltered();


    const images = filtered.map(item => item.image_mobile);
    const getPrice = () => {
        let sum = 0;
        filtered.forEach(item => {
            sum = sum + item.price;
        });
        return sum;
    };
    const price = getPrice();

    const dateFromServer = order.createdAt;


    let leftSpace = -48;
    const location = useLocation();

    return (
        <Link
            to={`/feed/${order.number}`}
            key={order.number}
            state={{background: location}}
            style={{textDecoration: "none"}}
            >
        <div className={`${itemStyles.list_item} p-6`}>
            <section className={itemStyles.item_header}>
                <p className={`text text_type_digits-default text_color_primary`}>{order.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>
                    <FormattedDate date={new Date(dateFromServer)}/>
                </p>
            </section>
            <section className={itemStyles.item_name}>
                <p className={`text text_type_main-medium text_color_primary`}>{order.name}</p>
            </section>
            <section className={itemStyles.item_content}>
                <div className={itemStyles.images}>
                    {images.map((value, index) => {
                            leftSpace = leftSpace + 48;
                            if (index <= 4) {
                                return (
                                    <div className={itemStyles.image_item}
                                         style={{left: leftSpace, zIndex: 6 - index}}
                                    >
                                        <img className={itemStyles.image}
                                             src={value}/>
                                    </div>
                                );
                            } else if (index === 5) {
                                return (
                                    <div className={itemStyles.image_item}
                                         style={{left: leftSpace, zIndex: 5 - index}}
                                    >
                                        <img className={itemStyles.image}
                                             src={value}
                                             style={{opacity: 0.3}}
                                        />
                                        <p className={`text text_type_digits-default text_color_primary ${itemStyles.counter}`}
                                           style={{zIndex: 10}}>+{images.length - 5}</p>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }
                    )}

                </div>
                <div className={itemStyles.price}>
                    <p className={`text text_type_digits-default text_color_primary`}>{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </section>
        </div>
    </Link>
    );
}