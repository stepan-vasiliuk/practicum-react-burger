import React from "react";
import cardTypeStyles from './ingredientType.module.css';
import IngredientCard from "../ingredientCard/ingredientCard";

export default function IngredientType({data, title, onCardClick}) {
    return (
        <div className={`${cardTypeStyles.section_container} pt-10`}>
            <h3 className={cardTypeStyles.title}>{title}</h3>
            <div>
                <ul className={cardTypeStyles.cards_grid}>
                    {data.map((ingredient) => {
                        return (
                            <IngredientCard
                                key={ingredient._id}
                                data={ingredient}
                                onCardClick={onCardClick}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}