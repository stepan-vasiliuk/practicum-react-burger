import cardStyles from "./ingredientDetailsPage.module.css";
import React from "react";
import IngredientDetails from "../../components/modal/ingredientDetails/IngredientDetails";
import {ingredientType} from "../../utils/types";

export default function IngredientDetailsPage({ingredient}) {

    return (
        <div className={cardStyles.ingredients_page}>
            <IngredientDetails ingredient={ingredient}></IngredientDetails>
        </div>
    )
}

IngredientDetailsPage.propTypes = ingredientType;