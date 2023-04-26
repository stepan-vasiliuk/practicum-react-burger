import React, {FC, FunctionComponent, useEffect, useMemo, useState} from "react";
import cardStyles from './ingredientCard.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import {Link, useLocation} from "react-router-dom";
import {IIngredient, IIngredientCard} from "../../utils/types";

export type TIngredientsDragType = {
    _id: string;
}
export const IngredientCard: FunctionComponent<IIngredientCard> = ({ingredient}) => {

    // @ts-ignore
    const bun: IIngredient = useSelector(state => state.constructorReducer.bun);
    // @ts-ignore
    const ingredientsList: Array<IIngredient> = useSelector(state => state.constructorReducer.ingredientsList);


    const location = useLocation();
    const currentId = ingredient._id;

    const counter = useMemo(() => getCount(), [bun, ingredientsList]);


    function getCount() {
        let count: number = 0;

        if (ingredient.type === 'bun') {
            if (bun?._id === ingredient._id) {
                count = 2;
            }
            return count;
        } else {
            ingredientsList.forEach(item => {
                if (item._id === ingredient._id) {
                    count++;
                }
            })
        }
        return count;
    }


    const {_id} = ingredient;

    const [, dragRef] = useDrag<TIngredientsDragType>({
        type: itemTypes.CARD,
        item: {_id},

    })


    return (
        <Link
            to={`/ingredients/${currentId}`}
            key={ingredient._id}
            state={{background: location}}
            style={{textDecoration: "none"}}
        >
            <li className={`${cardStyles.card} pl-4 pr-4 pb-8`}>
                {counter ?
                    <Counter count={counter} size={"default"}/> : null
                }
                <img className={cardStyles.image}
                     src={ingredient.image}
                     ref={dragRef}/>
                <div className={cardStyles.price}>
                    <p className={cardStyles.price_value}>{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={cardStyles.description}>{ingredient.name}</p>
            </li>
        </Link>
    )
}