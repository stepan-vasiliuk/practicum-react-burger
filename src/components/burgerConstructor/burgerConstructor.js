import React from "react";
import constructorStyles from './burgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructor({onButtonClick}) {
    const img = "https://code.s3.yandex.net/react/code/bun-02-mobile.png";
    return (
        <div className={`${constructorStyles.board} pt-25 pb-10 pl-4`}>
            <section className={constructorStyles.items}>
                <div className={constructorStyles.item_top}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
                <ul className={constructorStyles.scroll_list}>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                    <li className={constructorStyles.scroll_list_item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={img}
                        />
                    </li>
                </ul>
                <div className={constructorStyles.item_bottom}>
                    <ConstructorElement
                        type={"bottom"}
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
            </section>
            <section className={`${constructorStyles.total} pr-4`}>
                <p className={constructorStyles.total_price}>
                    <span className="text text_type_digits-medium">500</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type={"primary"} size={"large"} onClick={onButtonClick}>
                    Оформить заказ
                </Button>
            </section>
        </div>
    )


}