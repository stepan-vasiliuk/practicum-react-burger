import React, {useMemo} from "react";
import ingredientStyles from "./burgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from "../ingredientType/ingredientType";


export default function BurgerIngredients({data}) {

    const bun = useMemo(
        () => data.filter((ingredient) => ingredient.type === 'bun'),
        [data]
    );

    const topping = useMemo(
        () => data.filter((ingredient) => ingredient.type === 'main'),
        [data]
    );

    const sauce = useMemo(
        () => data.filter((ingredient) => ingredient.type === 'sauce'),
        [data]
    );

    return (
        <div className={ingredientStyles.container}>
            <section className={ingredientStyles.title}>
                <h1>Соберите бургер</h1>
            </section>
            <section className={ingredientStyles.tab_section}>
                <Tab value="one">
                    Булки
                </Tab>
                <Tab value="two">
                    Соусы
                </Tab>
                <Tab value="three">
                    Начинки
                </Tab>
            </section>
            <section className={ingredientStyles.scroll_container}>
                <IngredientType data={bun} title='Булки'></IngredientType>
                <IngredientType data={sauce} title='Соусы'></IngredientType>
                <IngredientType data={topping} title='Начинки'></IngredientType>
            </section>
        </div>
    )
}