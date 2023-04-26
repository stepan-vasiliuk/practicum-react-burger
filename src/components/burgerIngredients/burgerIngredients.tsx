import React, {ReactComponentElement, ReactElement, useEffect, useMemo, useRef, useState} from "react";
import ingredientStyles from "./burgerIngredients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientType} from "../ingredientType/ingredientType";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsLoad} from "../../services/actions";
import {IIngredient} from "../../utils/types";


export default function BurgerIngredients() {

    const [activeTab, setActiveTab] = useState<string>('bun');

    // @ts-ignore
    const ingredientsData: Array<IIngredient> = useSelector(state => state.dataReducer.data);

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

    const tabsRef = useRef<HTMLDivElement | null>(null);
    const bunRef = useRef<HTMLDivElement | null>(null);
    const toppingRef = useRef<HTMLDivElement | null>(null);
    const sauceRef = useRef<HTMLDivElement | null>(null);

    const handleOnScroll = () => {

        const bunSpacing = Math.abs(tabsRef.current!.getBoundingClientRect().top
            - bunRef.current!.getBoundingClientRect().top)
        const toppingSpacing = Math.abs(tabsRef.current!.getBoundingClientRect().top
            - toppingRef.current!.getBoundingClientRect().top);
        const sauceSpacing = Math.abs(tabsRef.current!.getBoundingClientRect().top
            - sauceRef.current!.getBoundingClientRect().top);

        const minSpacing = Math.min(bunSpacing, toppingSpacing, sauceSpacing);
        let currentTab = activeTab;

        if (minSpacing === bunSpacing) {
            currentTab = 'bun';
        }
        if (minSpacing === sauceSpacing) {
            currentTab = 'sauce';
        }
        if (minSpacing === toppingSpacing) {
            currentTab = 'topping';
        }
        setActiveTab(currentTab === activeTab ? activeTab : currentTab);
    }

    const handleOnTabClick = (id: string) => {
        const element: HTMLElement | null = document.querySelector(`#${id}`);
        element?.scrollIntoView({
            behavior: "smooth"
        })
    }

    return (
        <div className={ingredientStyles.container}>
            <div className={`${ingredientStyles.title} pt-10 pb-5`}>
                <h1>Соберите бургер</h1>
            </div>
            <div className={`${ingredientStyles.tab_section}`}>
                <Tab value="bun" active={activeTab === 'bun'}
                onClick={() => handleOnTabClick('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={activeTab === 'sauce'}
                     onClick={() => handleOnTabClick('sauce')}>
                    Соусы
                </Tab>
                <Tab value="topping" active={activeTab === 'topping'}
                onClick={() => handleOnTabClick('topping')}>
                    Начинки
                </Tab>
            </div>
            <div className={`${ingredientStyles.scroll_container}`}
                     ref={tabsRef}
                     onScroll={handleOnScroll}>
                <IngredientType groupType={bun} id='bun' title='Булки' propsRef={bunRef}/>
                <IngredientType groupType={sauce} id='sauce' title='Соусы' propsRef={sauceRef}/>
                <IngredientType groupType={topping} id='topping' title='Начинки' propsRef={toppingRef}/>
            </div>
        </div>
    )
}