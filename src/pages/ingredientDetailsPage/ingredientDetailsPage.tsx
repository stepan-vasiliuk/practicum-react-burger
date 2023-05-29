import cardStyles from "./ingredientDetailsPage.module.css";
import React from "react";
import IngredientDetails from "../../components/modal/ingredientDetails/IngredientDetails";
import {IIngredientCard} from "../../utils/types";

export default function IngredientDetailsPage({ingredient}: IIngredientCard): JSX.Element {

    return (
        <div className={cardStyles.ingredients_page}>
            <IngredientDetails ingredient={ingredient}></IngredientDetails>
        </div>
    );
}