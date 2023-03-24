import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import itemStyles from './constructorItem.module.css';
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import PropTypes, {number} from "prop-types";


export default function ConstructorItem({ingredient, index, handleMovingItem, handleClose, id}) {

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: itemTypes.INGREDIENT,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            handleMovingItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const [{opacity}, drag] = useDrag({
        type: itemTypes.INGREDIENT,
        item: () => {
            return {index, id};
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    })

    drag(drop(ref));

    return (
        <li className={itemStyles.scroll_list_item} style={{opacity}} ref={ref}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => handleClose(ingredient.key)}
            />
        </li>
    )
}

ConstructorItem.propTypes = {
    id: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleMovingItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
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
    }).isRequired,
}