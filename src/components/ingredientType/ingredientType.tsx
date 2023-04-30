import React, {FunctionComponent} from "react";
import cardTypeStyles from './ingredientType.module.css';
import {IngredientCard} from "../ingredientCard/ingredientCard";
import PropTypes, {arrayOf, string} from "prop-types";
import {Link, useLocation} from "react-router-dom";
import {IIngredientType} from "../../utils/types";

export const IngredientType: FunctionComponent<IIngredientType> =
    ({groupType, title, propsRef, id}) => {

    return (
        <div className={`${cardTypeStyles.section_container} pt-10`}
             ref={propsRef}
        >
            <h2 className={cardTypeStyles.title} id={id}>{title}</h2>
            <div>
                <ul className={cardTypeStyles.cards_grid}>
                    {groupType.map((ingredient) => {
                        return (
                            <IngredientCard
                                key={ingredient._id}
                                ingredient={ingredient}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}