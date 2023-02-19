import React from "react";
import cardStyles from './ingredientCard.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientCard({ingredient, onCardClick}) {

    return (
        <li className={`${cardStyles.card} pl-4 pr-4 pb-8`} onClick={() => onCardClick(ingredient)}>
            <Counter count={1} size={"default"}/>
            <img src={ingredient.image}></img>
            <div className={cardStyles.price}>
                <p className={cardStyles.price_value}>{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={cardStyles.description}>{ingredient.name}</p>
        </li>
    )
}