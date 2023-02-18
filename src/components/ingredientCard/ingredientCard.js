import React from "react";
import cardStyles from './ingredientCard.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientCard({data, onCardClick}) {

    return (
        <li className={`${cardStyles.card} pl-4 pr-4 pb-8`} onClick={() => onCardClick(data)}>
            <Counter count={1} size={"default"}/>
            <img src={data.image}></img>
            <div className={cardStyles.price}>
                <p className={cardStyles.price_value}>{data.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={cardStyles.description}>{data.name}</p>
        </li>
    )
}