import React, {useEffect} from "react";
import constructorStyles from './burgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
    addBun,
    addIngredient, clearConstructor,
    createOrder,
    modalOpen, removeIngredient,
    totalPriceUpdate,
    updateIngredients
} from "../../services/actions";
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import ConstructorItem from "../constructorItem/constructorItem";


export default function BurgerConstructor() {
    const {ingredientsList, bun, totalPrice} = useSelector(state => {
            console.log(`Constructor State >>>`, state.constructorReducer);
            return state.constructorReducer;
        }
    );
    const originalIngredients = useSelector(state => state.dataReducer.data);


    const dispatch = useDispatch();

    useEffect(() => {
        const ingredientsPrices = ingredientsList.map((ingredient) => ingredient.price);
        const bunPrice = bun.price * 2;
        dispatch(totalPriceUpdate([bunPrice, ...ingredientsPrices]));
    }, [ingredientsList, bun]);

    const handleOrderClick = () => {
        const ingredientIds = ingredientsList.map((ingredient) => ingredient._id);
        const idsToOrder = [bun._id, bun._id, ...ingredientIds];
        dispatch(createOrder(idsToOrder))

        dispatch(modalOpen());
        dispatch(clearConstructor());
    }

    const [, dropTarget] = useDrop({
            accept: itemTypes.CARD,
            drop(item) {
                handleDrop(item._id);
                console.log(`item.id>>>`, item._id)
            }
        }
    )

    const handleDrop = (id) => {
        const currentItem = originalIngredients.find((item) => item._id === id);
        if (!Object.keys(bun).length && currentItem.type === 'bun') {
            dispatch(addBun(currentItem));
        } else if (!Object.keys(bun).length && currentItem.type !== 'bun') {
            return;
        } else {
            currentItem.type === 'bun' ? dispatch(addBun(currentItem)) : dispatch(addIngredient(currentItem));
        }
    }

    const handleMovingItem = (dragIndex, hoverIndex) => {
        const updatedList = [...ingredientsList];
        const dragItem = updatedList[dragIndex];
        updatedList.splice(dragIndex, 1);
        updatedList.splice(hoverIndex, 0, dragItem);

        dispatch(updateIngredients(updatedList));
    }


    const handleDeleteItem = (key) => {
        const filteredArray = ingredientsList.filter(item => item.key !== key);
        dispatch(removeIngredient(filteredArray));
    }

    return (
        <div className={`${constructorStyles.board} pt-25 pb-10 pl-4`}>
            <section className={constructorStyles.items} ref={dropTarget}>
                {!Object.keys(bun).length ?
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Перетащите сюда булочку (низ)"
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
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}/>
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
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}/>
                        </div>
                    </>
                }
            </section>
            <section className={`${constructorStyles.total} pr-4`}>
                <p className={constructorStyles.total_price}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button type={"primary"} size={"large"}
                        onClick={() => handleOrderClick()}
                >Оформить заказ</Button>
            </section>
        </div>
    )

}

// BurgerConstructor.propTypes = {
//     onButtonClick: PropTypes.func.isRequired,
//     ingredientsArray: PropTypes.arrayOf(PropTypes.shape({
//         _id: PropTypes.string,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         proteins: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         carbohydrates: PropTypes.number.isRequired,
//         calories: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         image_large: PropTypes.string.isRequired,
//         image_mobile: PropTypes.string.isRequired,
//
//     }))
// }