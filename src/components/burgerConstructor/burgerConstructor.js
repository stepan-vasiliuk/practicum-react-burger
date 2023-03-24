import React, {useEffect, useMemo} from "react";
import constructorStyles from './burgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    addBun,
    addIngredient, clearConstructor,
    createOrder,
    modalOpen, removeIngredient,
    updateIngredients
} from "../../services/actions";
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import ConstructorItem from "../constructorItem/constructorItem";


export default function BurgerConstructor() {
    const ingredientsList = useSelector(state => state.constructorReducer.ingredientsList);
    const bun = useSelector(state => state.constructorReducer.bun);
    const totalPrice = useSelector(state => state.constructorReducer.totalPrice);

    const originalIngredients = useSelector(state => state.dataReducer.data);


    const dispatch = useDispatch();

    const totalPriceUpdated = useMemo(() => {
        let sum = 0;
        const bunPrice = bun?.price * 2;
        ingredientsList.map((item) => sum += item.price);
        sum = sum + bunPrice;
        if (!sum) {
            return 0;
        }
        return sum;
    }, [ingredientsList, bun])

    const handleOrderClick = () => {
        const ingredientIds = ingredientsList.map((ingredient) => ingredient._id);
        const idsToOrder = [bun?._id, bun?._id, ...ingredientIds];
        dispatch(createOrder(idsToOrder))

        dispatch(modalOpen());
        dispatch(clearConstructor());
    }

    const [, dropTarget] = useDrop({
            accept: itemTypes.CARD,
            drop(item) {
                handleDrop(item._id);
            }
        }
    )

    const handleDrop = (id) => {
        const currentItem = originalIngredients.find((item) => item._id === id);
        if (!bun && currentItem.type === 'bun') {
            dispatch(addBun(currentItem));
        } else if (!bun && currentItem.type !== 'bun') {
            return;
        } else {
            currentItem.type === 'bun' ? dispatch(addBun(currentItem)) : dispatch(addIngredient(currentItem));
        }
    }

    const handleMovingItem = (dragIndex, hoverIndex) => {
        dispatch(updateIngredients(dragIndex, hoverIndex));
    }


    const handleDeleteItem = (key) => {
        const filteredArray = ingredientsList.filter(item => item.key !== key);
        dispatch(removeIngredient(filteredArray));
    }

    return (
        <div className={`${constructorStyles.board} pt-25 pb-10 pl-4`}>
            <section className={constructorStyles.items} ref={dropTarget}>
                {!bun ?
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Перетащите сюда булочку (верх)"
                                price={0}
                                //thumbnail={''}
                            />
                        </div>
                        <div className={constructorStyles.item_bottom}>
                            <ConstructorElement
                                type={"bottom"}
                                isLocked={true}
                                text="Перетащите сюда булочку (низ)"
                                price={0}
                                //thumbnail={''}
                            />
                        </div>
                    </>
                    :
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun?.name} (верх)`}
                                price={bun?.price}
                                thumbnail={bun?.image_mobile}/>
                        </div>
                        <ul className={constructorStyles.scroll_list}>
                            {ingredientsList.map((ingredient, index) => (
                                <ConstructorItem
                                    ingredient={ingredient}
                                    key={ingredient.key}
                                    index={index}
                                    handleMovingItem={handleMovingItem}
                                    handleClose={handleDeleteItem}
                                    id={ingredient.key}
                                />)
                            )}
                        </ul>
                        <div className={constructorStyles.item_bottom}>
                            <ConstructorElement
                                type={"bottom"}
                                isLocked={true}
                                text={`${bun?.name} (низ)`}
                                price={bun?.price}
                                thumbnail={bun?.image_mobile}/>
                        </div>
                    </>
                }
            </section>
            <section className={`${constructorStyles.total} pr-4`}>
                <p className={constructorStyles.total_price}>
                    <span className="text text_type_digits-medium">{totalPriceUpdated}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button htmlType='button' type={"primary"} size={"large"}
                        onClick={() => handleOrderClick()}
                >Оформить заказ</Button>
            </section>
        </div>
    )

}