import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyles from "./ingredientsModal.module.css";
import React from "react";


export default function IngredientsModal({onClose, ingredient}) {
    return (
        <div className={cardStyles.ingredients_modal}>
            <div className={cardStyles.content_wrapper}>
                <div className={cardStyles.modal_header}>
                    <h1 className={`text text_type_main-large ${cardStyles.header_text}`}>Детали ингредиента</h1>
                    <a href='#' className={cardStyles.close_button} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </a>
                </div>
                <ul className={`pl-15 pr-15 ${cardStyles.modal_content}`}>
                    <li className={cardStyles.modal_image}>
                        <img src={ingredient.image_large}/>
                    </li>
                    <li className={`pt-4 ${cardStyles.modal_text}`}>
                        <h2 className={`text text_type_main-medium`}>{ingredient.name}</h2>
                    </li>
                    <li className={`pt-8 ${cardStyles.modal_description}`}>
                        <div>
                            <p className={`text text_type_main-default text_color_inactive
                     ${cardStyles.modal_description_text}`}>
                                Калории,ккал
                            </p>
                            <p className={`text text_type_digits-default text_color_inactive ${cardStyles.modal_description_text}`}>
                                {ingredient.calories}
                            </p>
                        </div>
                        <div>
                            <p className={`text text_type_main-default text_color_inactive
                     ${cardStyles.modal_description_text}`}>
                                Белки, г
                            </p>
                            <p className={`text text_type_digits-default text_color_inactive ${cardStyles.modal_description_text}`}>
                                {ingredient.proteins}
                            </p>
                        </div>
                        <div>
                            <p className={`text text_type_main-default text_color_inactive
                     ${cardStyles.modal_description_text}`}>
                                Жиры, г
                            </p>
                            <p className={`text text_type_digits-default text_color_inactive ${cardStyles.modal_description_text}`}>
                                {ingredient.fat}
                            </p>
                        </div>
                        <div>
                            <p className={`text text_type_main-default text_color_inactive
                     ${cardStyles.modal_description_text}`}>
                                Углеводы, г
                            </p>
                            <p className={`text text_type_digits-default text_color_inactive ${cardStyles.modal_description_text}`}>
                                {ingredient.carbohydrates}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}