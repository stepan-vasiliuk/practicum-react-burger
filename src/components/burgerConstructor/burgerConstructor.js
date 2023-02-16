import React from "react";
import constructorStyles from './burgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructor() {
    const img = "https://code.s3.yandex.net/react/code/bun-02-mobile.png";
    return (
        <div className={`${constructorStyles.board} pt-25 pb-10`}>
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
                <div className={constructorStyles.scroll_list}>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />

                </div>
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
            <section className={constructorStyles.total}>
                <p className={constructorStyles.total_price}>
                    <span className="text text_type_digits-medium">500</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type={"primary"} size={"large"}>
                    Оформить заказ
                </Button>
            </section>
        </div>
    )


}