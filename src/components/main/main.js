import React from "react";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import mainStyles from "./main.module.css";

export default function MainSection(props) {


    return (
        <main className={mainStyles.main}>
            <div className="container-wrapper">

                <div className={mainStyles.container_grid}>
                    <BurgerIngredients data={props.data}
                    onIngredientClick={props.onIngredientClick}/>
                    <BurgerConstructor isOpened={props.isOpened}
                                       onButtonClick={props.onButtonClick}/>
                </div>
            </div>
        </main>
    )
}

