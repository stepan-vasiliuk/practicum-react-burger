import React, {useMemo} from "react";
import ingredientStyles from "./burgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from "../ingredientType/ingredientType";
import PropTypes from "prop-types";


export default function BurgerIngredients({data, onIngredientClick}) {

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
            <section className={`${ingredientStyles.title} pt-10 pb-5`}>
                <h1>Соберите бургер</h1>
            </section>
            <section className={`${ingredientStyles.tab_section}`}>
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
            <section className={`${ingredientStyles.scroll_container}`}>
                <IngredientType onCardClick={onIngredientClick} data={bun} title='Булки'></IngredientType>
                <IngredientType onCardClick={onIngredientClick} data={sauce} title='Соусы'></IngredientType>
                <IngredientType onCardClick={onIngredientClick} data={topping} title='Начинки'></IngredientType>
            </section>
        </div>
    )
}

BurgerIngredients.propTypes = {
    onIngredientClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,

    }))
}