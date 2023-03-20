import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import itemStyles from './constructorItem.module.css';
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";


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