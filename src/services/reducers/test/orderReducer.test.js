import {initialState} from "../orderReducer";
import {orderReducer as reducer} from "../orderReducer";
import {
    getCurrentOrderInfo,
    getOrderFailed,
    getOrderSuccess,
    modalClose,
    modalOpen,
    orderDataLoadingOff,
    orderDataLoadingOn
} from "../../actions/orderActions";

describe('order reducer checking', () => {

    const order = {
        ingredients: ['01', '02', '03'],
        _id: '21221',
        status: 'done',
        number: 222,
        createdAt: '02-02-2021',
        updatedAt: '02-02-2023',
        name: 'some Name',
        owner: {
            name: 'Vasya Pizhikov',
            email: 'vasilyPizhik@email.com',
        }
    }

    it('should check all flags set to initial, except order', () => {
        expect(reducer({
            ...initialState,
            isOpen: true,
            hasError: true,
            isLoading: true,
            order: order,
        }, modalClose())).toStrictEqual({
            ...initialState,
            isOpen: false,
            hasError: false,
            isLoading: false,
            order: order,
        })
    })

    it('should change modal open flag to true', () => {
        expect(reducer(initialState, modalOpen())).toStrictEqual({
            ...initialState,
            isOpen: true,
        })
    })

    it('should fill order field with correct order', () => {
        expect(reducer(initialState, getOrderSuccess(order))).toStrictEqual({
            ...initialState,
            order: order,
        })
    })

    it('should change hasError flag value to <true>', () => {
        expect(reducer(initialState, getOrderFailed())).toStrictEqual({
            ...initialState,
            hasError: true,
        })
    })

    it('should change isLoading flag to <true>', () => {
        expect(reducer(initialState, orderDataLoadingOn())).toStrictEqual({
            ...initialState,
            isLoading: true,
        })
    })

    it('should change isLoading flag to false', () => {
        expect(reducer(initialState, orderDataLoadingOff()))
            .toStrictEqual(initialState)
    })

    it('should set up to order field data from array', () => {
        const array = [order];
        expect(reducer(initialState, getCurrentOrderInfo(array))).toStrictEqual({
            ...initialState,
            order: order,
        })
    })

})