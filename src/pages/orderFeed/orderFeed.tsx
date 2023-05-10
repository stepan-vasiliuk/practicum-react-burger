import orderFeedStyles from "./orderFeed.module.css";
import React, {useState} from "react";
import {IIngredient} from "../../utils/types";
import {useSelector} from "react-redux";
import cardStyles from "../../components/ingredientCard/ingredientCard.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDashBoard from "../../components/orderFeed/feedDashBoard/feedDashBoard";

export default function OrderFeed() {
    //@ts-ignore
    const arrayData: Array<IIngredient> = useSelector(state => state.dataReducer.data);
    const imageMobile = arrayData[0].image_mobile;

    const arrayFirstElements = arrayData.map(item => item.image_mobile).splice(0, 8);
    console.log(arrayFirstElements.length);

    let leftSpace = -48;

    return (
        <div className={orderFeedStyles.grid_container}>
            <section className={orderFeedStyles.left_board}>

                <h3 className="text text_type_main-large mt-10">Лента заказов</h3>
                <div className={orderFeedStyles.scroll_list}>
                    <div className={`${orderFeedStyles.list_item} p-6`}>
                        <section className={orderFeedStyles.item_header}>
                            <p className={`text text_type_digits-default`}>#033049</p>
                            <p className={`text text_type_main-default text_color_inactive`}>Сегодня, 21:21</p>
                        </section>
                        <section className={orderFeedStyles.item_name}>
                            <p className={`text text_type_main-medium`}>Неизвестные космические колбаски</p>
                        </section>
                        <section className={orderFeedStyles.item_content}>
                            <div className={orderFeedStyles.images}>
                                {arrayFirstElements.map((value, index) => {
                                        leftSpace = leftSpace + 48;
                                        if (index <= 4) {
                                            return (
                                                <div className={orderFeedStyles.image_item}
                                                     style={{left: leftSpace, zIndex: 6 - index}}
                                                >
                                                    <img className={orderFeedStyles.image}
                                                         src={value}/>
                                                </div>
                                            );
                                        } else if (index === 5) {
                                            return (
                                                <div className={orderFeedStyles.image_item}
                                                     style={{left: leftSpace, zIndex: 5 - index}}
                                                >
                                                    <img className={orderFeedStyles.image}
                                                         src={value}
                                                         style={{opacity: 0.3}}
                                                    />
                                                    <p className={`text text_type_digits-default ${orderFeedStyles.counter}`}
                                                       style={{zIndex: 10}}>+{arrayFirstElements.length - 5}</p>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    }
                                )}

                            </div>
                            <div className={orderFeedStyles.price}>
                                <p className={`text text_type_digits-default`}>521</p>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </section>
                    </div>

                </div>
            </section>
            <section className={orderFeedStyles.right_board}>
                <FeedDashBoard />
            </section>
        </div>
    );
}