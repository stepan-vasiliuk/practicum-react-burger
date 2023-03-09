import React, {useEffect, useMemo} from "react";
import ingredientStyles from "./burgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientType from "../ingredientType/ingredientType";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsLoad} from "../../services/actions";


export default function BurgerIngredients() {

    const ingredientsData = useSelector(state => {
        const {dataReducer} = state;
        return dataReducer.data;
    })

    const bun = useMemo(
        () => ingredientsData.filter((ingredient) => ingredient.type === 'bun'),
        [ingredientsData]
    );

    const topping = useMemo(
        () => ingredientsData.filter((ingredient) => ingredient.type === 'main'),
        [ingredientsData]
    );

    const sauce = useMemo(
        () => ingredientsData.filter((ingredient) => ingredient.type === 'sauce'),
        [ingredientsData]
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
                <IngredientType groupType={bun} title='Булки'/>
                <IngredientType groupType={sauce} title='Соусы'/>
                <IngredientType groupType={topping} title='Начинки'/>
            </section>
        </div>
    )
}

BurgerIngredients.propTypes = {
    onIngredientClick: PropTypes.func.isRequired,
    ingredientArray: PropTypes.arrayOf(PropTypes.shape({
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