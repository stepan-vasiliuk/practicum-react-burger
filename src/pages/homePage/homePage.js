import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../../components/burgerConstructor/burgerConstructor";
import {DndProvider} from "react-dnd";
import React from "react";
import homeStyles from './homePage.module.css';

export default function HomePage() {
    return (
        <div className={homeStyles.container_grid}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </div>
    )
}