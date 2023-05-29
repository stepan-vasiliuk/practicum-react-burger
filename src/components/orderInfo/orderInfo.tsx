import styles from "./orderInfo.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";
import React, {useEffect} from "react";
import {getOrder} from "../../services/actions";
import {useLocation} from "react-router-dom";
import {IIngredient, orderStatus} from "../../utils/types";


export default function OrderInfo() {


    const location = useLocation();
    const orderNumber = Number(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));

    const dispatch = useTypedDispatch();

    const ingredients = useTypedSelector(state => state.dataReducer.data);

    let current = useTypedSelector(state => {
        const feedOrderNumbers = state.wsFeedReducer.orders?.orders.find(item => item.number === orderNumber);
        const profileOrder = state.wsOrderReducer.orders?.orders.find(item => item.number === orderNumber);
        const orderFromModal = state.orderReducer.order?.number === orderNumber ? state.orderReducer.order : null;
        return feedOrderNumbers || profileOrder || orderFromModal;
    });


    useEffect(() => {
        if (!current) {
            dispatch(getOrder(orderNumber));
        } else {
            console.log("Order found! >>> ", current);
        }
    }, [current]);


    let currentIngredients: string[] = [];
    if (current) {
        currentIngredients = current!.ingredients;
    }


    let ingredientsMap = new Map<IIngredient, number>;
    currentIngredients.forEach(item => {
        ingredients.forEach(ingredient => {
            if (item === ingredient._id) {
                ingredientsMap.set(ingredient, (ingredientsMap.get(ingredient) || 0) + 1);
            }
        });
    });

    const getPrice = () => {
        let sum = 0;
        Array.from(ingredientsMap.entries()).forEach(item => {
            sum += item[0].price * item[1];
        });
        return sum;
    };

    const price = getPrice();


    return (
        <>
            {current
            && current.ingredients
            && current.ingredients.length
                ?
                <div className={styles.modal_window}>
                    <div className={styles.content_wrapper}>
                        <section className={styles.header}>
                            <div className={styles.order_number}>
                                <p className={`text text_type_digits-default`}>#{current.number}</p>
                            </div>
                            <div className={styles.order_name}>
                                <p className={`text text_type_main-medium`}>{current.name}</p>
                                <p className={`text text_type_main-small ${current.status === "done"
                                    ? "text_color_success" : ""}`}>{current.status === "done" ?
                                    orderStatus.done : orderStatus.pending}</p>
                            </div>
                        </section>
                        <section className={styles.content}>
                            <div className={styles.content_main}>
                                <p className={`text text_type_main-medium ${styles.content_header}`}>Состав:</p>
                                <ul className={styles.scroll_list}>
                                    {Array.from(ingredientsMap.entries()).map(el => {
                                        return (
                                            <li className={styles.scroll_list_item}>
                                                <div className={styles.image_item}>
                                                    <img className={styles.image} src={el[0].image_mobile}/>
                                                </div>

                                                <p className={`text text_type_main-default ${styles.item_name} pl-4 pr-10`}>
                                                    {el[0].name}
                                                </p>
                                                <div className={styles.item_price}>
                                                    <p className={`text text_type_digits-default`}>{el[1]} x {el[0].price}</p>
                                                    <CurrencyIcon type={"primary"}/>
                                                </div>
                                            </li>
                                        );
                                    })
                                    }
                                </ul>
                            </div>
                            <div className={styles.content_details}>
                                <p className={`text text_type_main-small text_color_inactive`}>
                                    <FormattedDate date={new Date(current.createdAt)}/>
                                </p>
                                <div className={styles.price}>
                                    <p className={`text text_type_digits-default`}>{price}</p>
                                    <CurrencyIcon type={"primary"}/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                :
                <div className={styles.modal_window}>
                    <p className={`text text_type_main-default`}>Загрузка данных..</p>
                </div>
            }
        </>
    );
}