import React, {useEffect} from "react";
import cardStyles from './ingredientCard.module.css';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {addBun, addIngredient, modalOpen} from "../../services/actions";
import {useDrag} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import {v4 as uuidv4} from 'uuid';

export default function IngredientCard({ingredient}) {

    const {bun, ingredientsList} = useSelector(state => state.constructorReducer);

    const dispatch = useDispatch();

    const handleOnCardClick = (e) => {
        dispatch(modalOpen(ingredient))
    }

    useEffect(() => {
        getCount();
    }, [bun, ingredientsList])

    const getCount = () => {
        let count = 0;

        if (ingredient.type === 'bun') {
            //Здесь получил ошибку- cant reading undefined in reading _id
            //Не смог воспроизвести повторно
            if (bun._id === ingredient._id) {
                count = 2;
                return count;
            }
        }
        ingredientsList.forEach(item => {
            if (item._id === ingredient._id) {
                count++;
            }
        })
        return count;
    }


    const {_id} = ingredient;
    const [, dragRef] = useDrag(() => ({
        type: itemTypes.CARD,
        item: {_id},

    }))


    return (
        <li className={`${cardStyles.card} pl-4 pr-4 pb-8`}>
            {getCount() ?
                <Counter count={getCount()} size={"default"}/> : null
            }
            <img className={cardStyles.image}
                 src={ingredient.image}
                 onClick={() => handleOnCardClick()}
                 ref={dragRef}
            ></img>
            <div className={cardStyles.price}>
                <p className={cardStyles.price_value}>{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={cardStyles.description}>{ingredient.name}</p>
        </li>
    )
}
