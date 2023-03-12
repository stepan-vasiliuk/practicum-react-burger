import React from "react";
import cardStyles from './ingredientCard.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addBun, addIngredient, modalOpen} from "../../services/actions";

export default function IngredientCard({ingredient}) {

    const {bun} = useSelector(state => state.constructorReducer);

    const dispatch = useDispatch();

    const handleOnCardClick = (e) => {
        dispatch(modalOpen(ingredient))
    }

    const handleAddClick = (e) => {
        console.log('Click on counter');
        if (!Object.keys(bun).length && ingredient.type === 'bun') {
            dispatch(addBun(ingredient))
        } else if (!Object.keys(bun).length && ingredient.type !== 'bun') {
            return;
        } else {
            ingredient.type === 'bun' ? dispatch(addBun(ingredient)) : dispatch(addIngredient(ingredient));
        }
    }

    return (
        <li className={`${cardStyles.card} pl-4 pr-4 pb-8`}>
            <Counter count={1} size={"default"}/>
            <img src={ingredient.image} onClick={() => handleOnCardClick()}></img>
            <div className={cardStyles.price}>
                <p className={cardStyles.price_value}>{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={cardStyles.description}>{ingredient.name}</p>
            <button className={cardStyles.plus_icon} onClick={handleAddClick}>
                <p className={cardStyles.plus_icon_text}>+</p>
            </button>
        </li>
    )
}