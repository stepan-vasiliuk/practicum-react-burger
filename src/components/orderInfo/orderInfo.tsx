import styles from "./orderInfo.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useTypedSelector} from "../../hooks/hooks";

export default function OrderInfo() {


    //TODO: Fix scroll list styles

    const array = useTypedSelector(state => state.dataReducer.data);
    const image = array[0].image_mobile;

    return (
        <>
            <div className={styles.modal_window}>
                <div className={styles.content_wrapper}>
                    <section className={styles.header}>
                        <div className={styles.order_number}>
                            <p className={`text text_type_digits-default`}>#039485</p>
                        </div>
                        <div className={styles.order_name}>
                            <p className={`text text_type_main-medium`}>Super Mega Porsche Реактивный Мяч</p>
                            <p className={"text text_type_main-small text_color_success"}>Выполнен</p>
                        </div>
                    </section>
                    <section className={styles.content}>
                        <div className={styles.content_main}>
                            <p className={`text text_type_main-medium ${styles.content_header}`}>Состав:</p>
                            <ul className={styles.scroll_list}>
                                <li className={styles.scroll_list_item}>

                                    <div className={styles.image_item}>
                                        <img className={styles.image} src={image}/>
                                    </div>
                                    <div className={styles.item_name}>
                                        <p className={`text text_type_main-default ${styles.item_name} pl-4 pr-10`}>
                                            Межгалактическая очень вкусная колбаска с добавлением сковарианской девы
                                            ,фаршированной тремя тоннами свежайшего суверена
                                        </p>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p className={`text text_type_digits-default`}>2 x 20</p>
                                        <CurrencyIcon type={"primary"}/>
                                    </div>
                                </li>
                                <li className={styles.scroll_list_item}>

                                    <div className={styles.image_item}>
                                        <img className={styles.image} src={image}/>
                                    </div>
                                    <div className={styles.item_name}>
                                        <p className={`text text_type_main-default ${styles.item_name} pl-4 pr-10`}>
                                            Межгалактическая очень вкусная колбаска с добавлением сковарианской девы
                                            ,фаршированной тремя тоннами свежайшего суверена
                                        </p>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p className={`text text_type_digits-default`}>2 x 20</p>
                                        <CurrencyIcon type={"primary"}/>
                                    </div>
                                </li>
                                <li className={styles.scroll_list_item}>

                                    <div className={styles.image_item}>
                                        <img className={styles.image} src={image}/>
                                    </div>
                                    <div className={styles.item_name}>
                                        <p className={`text text_type_main-default ${styles.item_name} pl-4 pr-10`}>
                                            Межгалактическая очень вкусная колбаска с добавлением сковарианской девы
                                            ,фаршированной тремя тоннами свежайшего суверена
                                        </p>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p className={`text text_type_digits-default`}>2 x 20</p>
                                        <CurrencyIcon type={"primary"}/>
                                    </div>
                                </li>
                                <li className={styles.scroll_list_item}>

                                    <div className={styles.image_item}>
                                        <img className={styles.image} src={image}/>
                                    </div>
                                    <div className={styles.item_name}>
                                        <p className={`text text_type_main-default ${styles.item_name} pl-4 pr-10`}>
                                            Межгалактическая очень вкусная колбаска с добавлением сковарианской девы
                                            ,фаршированной тремя тоннами свежайшего суверена
                                        </p>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p className={`text text_type_digits-default`}>2 x 20</p>
                                        <CurrencyIcon type={"primary"}/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.content_details}>
                            <p className={`text text_type_main-small text_color_inactive`}>Вчера, 15:15</p>
                            <div className={styles.price}>
                                <p className={`text text_type_digits-default`}>510</p>
                                <CurrencyIcon type={"primary"}/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}