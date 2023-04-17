import cardStyles from "./ingredientDetailsPage.module.css";
import React from "react";
import IngredientDetails from "../../components/modal/ingredientDetails/IngredientDetails";

export default function IngredientDetailsPage({ingredient}) {

    return (
        <div className={cardStyles.ingredients_page}>
            <IngredientDetails ingredient={ingredient}></IngredientDetails>
        </div>
    )
}