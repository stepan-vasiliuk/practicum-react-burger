import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import itemStyles from "./constructorItem.module.css";
import {useDrag, useDrop} from "react-dnd";
import {itemTypes} from "../../services/itemTypes";
import {IConstructorIngredient} from "../../utils/types";

export type TConstructorItemProps = {
    ingredient: IConstructorIngredient;
    index: number;
    handleMovingItem: (dragIndex: number, hoverIndex: number) => void;
    handleClose: (key: string) => void;
    id: string;
}

export type TDragType = {
    id: string,
    index: number,
}
type TDragCollectedProps = {
    isDragging: boolean,
}
export default function ConstructorItem({ingredient, index, handleMovingItem, handleClose, id}: TConstructorItemProps)
    : JSX.Element {

    const ref = useRef<HTMLLIElement | null>(null);

    const [, drop] = useDrop<TDragType>({
        accept: itemTypes.INGREDIENT,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
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
    });

    const [{isDragging}, drag] = useDrag<TDragType, unknown, TDragCollectedProps>({
        type: itemTypes.INGREDIENT,
        item: () => {
            return {index, id};
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });
    const opacity = isDragging ? 0 : 1;

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
    );
}