import {constructorReducer as reducer} from "../constructorReducer";
import {initialState} from "../constructorReducer";
import {
    addBun,
    clearConstructor,
    removeIngredient,
    updateIngredients
} from "../../actions/constructorActions";
import {ADD_INGREDIENT} from "../../actionTypes";


describe("Constructor Reducer", () => {
    const bunOne = {
        _id: "id010101id",
        name: "Большая краторная спец булка",
        type: "bun",
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 40,
        price: 100,
        image: "default_image",
        image_large: "image_large",
        image_mobile: "image_mobile",
    };
    const ingredientOne = {
        _id: "id010104id",
        name: "Котлетка из среднеазиатского котлетного выхвостня",
        type: "main",
        proteins: 200,
        fat: 300,
        carbohydrates: 200,
        calories: 500,
        price: 550,
        image: "default_image",
        image_large: "image_large",
        image_mobile: "image_mobile",
    };

    const ingredientsList = [
        {
            _id: "id010102id",
            name: "Специальный остренький соус",
            type: "sauce",
            proteins: 10,
            fat: 5,
            carbohydrates: 10,
            calories: 11,
            price: 50,
            image: "default_image",
            image_large: "image_large",
            image_mobile: "image_mobile",
            key: "241-141"
        },
        {
            _id: "id010103id",
            name: "Отличное прожаренное филе фугу",
            type: "main",
            proteins: 100,
            fat: 500,
            carbohydrates: 90,
            calories: 350,
            price: 250,
            image: "default_image",
            image_large: "image_large",
            image_mobile: "image_mobile",
            key: "241-142"
        }, {
            _id: "id010104id",
            name: "Котлетка из среднеазиатского котлетного выхвостня",
            type: "main",
            proteins: 200,
            fat: 300,
            carbohydrates: 200,
            calories: 500,
            price: 550,
            image: "default_image",
            image_large: "image_large",
            image_mobile: "image_mobile",
            key: "241-143",
        }
    ];

    const updatedIngredientsList = [
        {
            _id: "id010102id",
            name: "Специальный остренький соус",
            type: "sauce",
            proteins: 10,
            fat: 5,
            carbohydrates: 10,
            calories: 11,
            price: 50,
            image: "default_image",
            image_large: "image_large",
            image_mobile: "image_mobile",
            key: "241-141"
        },
        {
            _id: "id010103id",
            name: "Отличное прожаренное филе фугу",
            type: "main",
            proteins: 100,
            fat: 500,
            carbohydrates: 90,
            calories: 350,
            price: 250,
            image: "default_image",
            image_large: "image_large",
            image_mobile: "image_mobile",
            key: "241-142"
        },
    ];


    it("should add bun", () => {
        expect(reducer(initialState, addBun(bunOne))).toStrictEqual({
            ...initialState,
            bun: bunOne,
        });
    });

    it("should remove ingredient", () => {
        expect(reducer({
            ...initialState,
            ingredientsList: ingredientsList,
        }, removeIngredient(updatedIngredientsList))).toStrictEqual({
            ...initialState,
            ingredientsList: updatedIngredientsList,
        });
    });

    it("should add ingredient", () => {
        const ingredientToAdd = ingredientOne;
        const action = () => {
            return {
                type: ADD_INGREDIENT,
                data: ingredientToAdd,
                key: "241-143",
            }
        };
        expect(reducer({
                ...initialState,
                ingredientsList: updatedIngredientsList,
            }
            , action(ingredientToAdd))).toStrictEqual({
            ...initialState,
            ingredientsList: ingredientsList,
        });
    });

    it('should replace ingredients in array', () => {
        const initial = {
            ...initialState,
            ingredientsList: ingredientsList,
            bun: bunOne,
        }
        const updatedArray = [...ingredientsList]
        const movingItem = updatedArray[0];
        updatedArray.splice(0, 1);
        updatedArray.splice(1, 0, movingItem)

        expect(reducer(initial, updateIngredients(0, 1))).toStrictEqual({
            ...initial,
            ingredientsList: updatedArray,
        })
    })

    it('should clear constructor data', () => {
        const initial = {
            ...initialState,
            ingredientsList: ingredientsList,
            bun: bunOne,
        }

        expect(reducer(initial, clearConstructor())).toStrictEqual({
           ...initialState
        })
    });

    it('should return initial state', () => {
        expect(reducer(initialState, {type: ""})).toEqual(initialState);
    })

});