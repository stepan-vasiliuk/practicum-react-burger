import React from "react";
import cardTypeStyles from './ingredientType.module.css';
import IngredientCard from "../ingredientCard/ingredientCard";
import PropTypes, {arrayOf, string} from "prop-types";

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

IngredientType.propTypes = {
    groupType: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,

    })),
    title: PropTypes.string.isRequired,
    propsRef: PropTypes.object.isRequired,
    id: PropTypes.string
}