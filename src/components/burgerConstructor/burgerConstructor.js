import React, {useEffect} from "react";
import constructorStyles from './burgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {modalOpen, totalPriceUpdate} from "../../services/actions";


export default function BurgerConstructor() {
    const {ingredientsList, bun, totalPrice} = useSelector(state => {
            console.log(`Constructor State >>>`, state.constructorReducer);
            return state.constructorReducer;
        }
    );
    console.log(`Ingredients in constructor >>>`, ingredientsList);

    const dispatch = useDispatch();

    useEffect(() => {
        const ingredientsPrices = ingredientsList.map((ingredient) => ingredient.price);
        const bunPrice = bun.price * 2;
        dispatch(totalPriceUpdate([bunPrice, ...ingredientsPrices]));
    }, [ingredientsList, bun]);

    const handleOrderClick = () => {
        dispatch(modalOpen());
    }

    // const ingredientsData = useSelector(state => {
    //     const {dataReducer} = state;
    //     return dataReducer.data;
    // })
    //
    // const {price, name, image_mobile} = ingredientsData[1];

    return (
        <div className={`${constructorStyles.board} pt-25 pb-10 pl-4`}>
            <section className={constructorStyles.items}>
                {!Object.keys(bun).length ?
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Перетащите сюда булочку (верх)"
                                price={0}
                                thumbnail={''}/>
                        </div>
                        <div className={constructorStyles.item_bottom}>
                            <ConstructorElement
                                type={"bottom"}
                                isLocked={true}
                                text="Перетащите сюда булочку (низ)"
                                price={0}
                                thumbnail={''}/>
                        </div>
                    </>
                    :
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image_mobile}/>
                        </div>
                        <ul className={constructorStyles.scroll_list}>
                        {ingredientsList.map(ingredient => (
                                    <li className={constructorStyles.scroll_list_item}>
                                        <DragIcon type="primary"/>
                                        <ConstructorElement
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image_mobile}/>
                                    </li>
                            )
                        )}
                        </ul>
                        <div className={constructorStyles.item_bottom}>
                            <ConstructorElement
                                type={"bottom"}
                                isLocked={true}
                                text={bun.name}
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
                >
                    Оформить заказ
                </Button>
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