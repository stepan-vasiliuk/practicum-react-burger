import {initialState, wsOrderReducer as reducer} from "../wsOrderReducer";
import {WebsocketStatus} from "../../../utils/types";
import {wsOrderClose, wsOrderConnecting, wsOrderOpen} from "../../actions/wsOrderActions";
import {feedWsClose, feedWsConnecting} from "../../actions/wsFeedActions";

describe('wsOrderReducer test', () => {

    const profileOrders = {
        total: 2000,
        totalToday: 10,
        orders: [
            {
                ingredients: ['122', '1212', '23323'],
                _id: '01',
                status: 'done',
                number: 22,
                createdAt: '2022-02-02',
                updatedAt: '2022-02-03',
                name: 'name1',
                owner: {
                    name: 'Viktor',
                    email: 'vik@vik.ru',
                }
            },
            {
                ingredients: ['123', '124', '125'],
                _id: '02',
                status: 'pending',
                number: 23,
                createdAt: '2022-02-02',
                updatedAt: '2022-02-03',
                name: 'name2',
                owner: {
                    name: 'Viktor',
                    email: 'vik@vik.ru',
                }
            },
        ]

    }


    it('should change ws status to Online when open connection', () => {
        expect(reducer({
            ...initialState,
            connectionError: "some string",
        }, wsOrderOpen)).toStrictEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE,
        })
    })
    it('should reset state to initial when closing connection', () => {
        const temporaryState = {
            ...initialState,
            status: WebsocketStatus.ONLINE,
            connectionError: "some string",
        }
        expect(reducer(temporaryState, wsOrderClose)).toStrictEqual(
            initialState)
    })

    it('should set up error message from action payload', () => {
        const action = {
            payload: 'Error message',
            type: 'WS_ORDER_ERROR',
        }

        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            connectionError: 'Error message',
        })
    })

    it('should fill orders field with orders data', () => {
        const action = {
            type: 'WS_ORDER_MESSAGE',
            payload: profileOrders,
        }
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            orders: profileOrders,
        })
    })

    it('should update status when connecting is in progress', () => {
        expect(reducer(initialState, wsOrderConnecting)).toStrictEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING,
        })
    })



})