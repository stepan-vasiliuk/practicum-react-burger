import React from "react";
import cardTypeStyles from './ingredientType.module.css';
import IngredientCard from "../ingredientCard/ingredientCard";

export default function IngredientType({groupType, title, propsRef, id}) {
    return (
        <div className={`${cardTypeStyles.section_container} pt-10`}
             ref={propsRef}
        >
            <h3 className={cardTypeStyles.title} id={id}>{title}</h3>
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