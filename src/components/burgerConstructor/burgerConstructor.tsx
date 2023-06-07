import React, {useEffect, useMemo} from "react";
import constructorStyles from "./burgerConstructor.module.css";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";
import {checkUserAuth, createOrder} from "../../services/actions";
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import ConstructorItem from "../constructorItem/constructorItem";
import {useNavigate} from "react-router-dom";
import {IConstructorIngredient, IIngredient, IUser} from "../../utils/types";
import {TIngredientsDragType} from "../ingredientCard/ingredientCard";
import {modalOpen} from "../../services/actions/orderActions";
import {
    addBun,
    addIngredient,
    clearConstructor,
    removeIngredient,
    updateIngredients
} from "../../services/actions/constructorActions";


export default function BurgerConstructor(): JSX.Element {

    const ingredientsList: ReadonlyArray<IConstructorIngredient> | [] = useTypedSelector(
        state => state.constructorReducer.ingredientsList);

    const bun: IIngredient | null = useTypedSelector(
        state => state.constructorReducer.bun);

    const originalIngredients: ReadonlyArray<IIngredient> | [] = useTypedSelector(
        state => state.dataReducer.data);

    const user: IUser | null = useTypedSelector(state => state.userReducer.user);

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();


    const totalPriceUpdated = useMemo(() => {
        let sum = 0;
        let bunPrice = 0;
        if (bun) {
            bunPrice = bun.price * 2;
        }
        ingredientsList.map((item) => sum += item.price);
        sum = sum + bunPrice;
        if (!sum) {
            return 0;
        }
        return sum;
    }, [ingredientsList, bun]);

    const handleOrderClick = () => {
        const ingredientIds = ingredientsList.map((ingredient) => ingredient._id);
        const idsToOrder = [bun?._id, ...ingredientIds, bun?._id];
        checkUserAuth();
        if (user) {
            //TODO: Убрать ts-ignore

            // @ts-ignore
            dispatch(createOrder(idsToOrder));
            dispatch(modalOpen());
            dispatch(clearConstructor());
        } else navigate("/login");
    };

    const [, dropTarget] = useDrop<TIngredientsDragType>({
            accept: itemTypes.CARD,
            drop(item) {
                handleDrop(item._id);
            }
        }
    );

    const handleDrop = (id: string) => {
        const currentItem = originalIngredients.find((item) => item._id === id);
        if (currentItem) {
            if (!bun && currentItem?.type === "bun") {
                dispatch(addBun(currentItem));
            } else if (!bun && currentItem?.type !== "bun") {
                return;
            } else {
                currentItem?.type === "bun" ? dispatch(addBun(currentItem)) : dispatch(addIngredient(currentItem));
            }
        }
    };

    const handleMovingItem = (dragIndex: number, hoverIndex: number) => {
        dispatch(updateIngredients(dragIndex, hoverIndex));
    };


    const handleDeleteItem = (key: string) => {
        const filteredArray = ingredientsList.filter(item => item.key !== key);
        dispatch(removeIngredient(filteredArray));
    };

    return (
        <div className={`${constructorStyles.board} pt-25 pb-10 pl-4`}>
            <section data-test='drop_target' className={constructorStyles.items} ref={dropTarget}>
                {!bun ?
                    <>
                        <div className={constructorStyles.item_top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Перетащите сюда булочку (верх)"
                                price={0}
                                thumbnail={""}
                            />
                        </div>
                        <div className={constructorStyles.item_bottom}>
                            <ConstructorElement
                                type={"bottom"}
                                isLocked={true}
                                text="Перетащите сюда булочку (низ)"
                                price={0}
                                thumbnail={""}
                            />
                        </div>
                    </>
                    :
                    <>
                        <div data-test='item_top' className={constructorStyles.item_top}>
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
                        <div data-test='item_bottom' className={constructorStyles.item_bottom}>
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
                <Button data-test='order_button' htmlType="button" type={"primary"} size={"large"}
                        onClick={() => handleOrderClick()}
                >Оформить заказ</Button>
            </section>
        </div>
    );

}