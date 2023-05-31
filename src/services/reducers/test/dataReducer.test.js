import {dataReducer as reducer} from "../dataReducer";
import {initialState} from "../dataReducer";
import {
    dataErrorOn,
    dataLoadingOff,
    dataLoadingOn,
    ingredientsGetFailed,
    ingredientsGetSuccess
} from "../../actions/dataActions";

describe('Data Reducer Checking', () => {

    const ingredientsList = [
        {
            _id: "id01",
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
        },
        {
            _id: "id02",
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
        },
        {
            _id: "id03",
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
        }
    ];

    it('should fill init data array with ingredients', () => {
        expect(reducer(initialState, ingredientsGetSuccess(ingredientsList))).toStrictEqual({
            ...initialState,
            data: ingredientsList,
        })
    })

    it('should set up flags when failed to get ingredients', () => {
        expect(reducer(initialState, ingredientsGetFailed())).toStrictEqual({
            ...initialState,
            hasError: true,
            isLoading: false,
        })
    })

    it('should switch error flag to true', () => {
        expect(reducer(initialState, dataErrorOn("Ошибка"))).toStrictEqual({
            ...initialState,
            hasError: true,
        })
    })

    it('should set loading flag to true', () => {
        expect(reducer(initialState, dataLoadingOn())).toStrictEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should set loading flag to false', () => {
        expect(reducer(initialState, dataLoadingOff())).toStrictEqual({
            ...initialState,
        })
    });

    it('should return initial state', () => {
        expect(reducer(initialState, {type: ""})).toEqual(initialState);
    })

})