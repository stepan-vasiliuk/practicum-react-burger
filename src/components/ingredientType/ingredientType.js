import React from "react";
import cardTypeStyles from './ingredientType.module.css';
import IngredientCard from "../ingredientCard/ingredientCard";

export default function IngredientType({groupType, title, onCardClick}) {
    return (
        <div className={`${cardTypeStyles.section_container} pt-10`}>
            <h3 className={cardTypeStyles.title}>{title}</h3>
            <div>
                <ul className={cardTypeStyles.cards_grid}>
                    {groupType.map((ingredient) => {
                        return (
                            <IngredientCard
                                key={ingredient._id}
                                ingredient={ingredient}
                                onCardClick={onCardClick}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}