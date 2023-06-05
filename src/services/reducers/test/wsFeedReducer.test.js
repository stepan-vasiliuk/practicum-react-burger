import {initialState, wsFeedReducer as reducer} from '../wsFeedReducer';
import {feedWsClose, feedWsConnecting, feedWsError, feedWsOpen} from "../../actions/wsFeedActions";
import {WebsocketStatus} from "../../../utils/types";

describe('wsFeedReducer test', () => {

    const feedOrders = {
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
            },
            {
                ingredients: ['123', '124', '125'],
                _id: '02',
                status: 'pending',
                number: 23,
                createdAt: '2022-02-02',
                updatedAt: '2022-02-03',
                name: 'name2',
            },
        ]

    }


    it('should change ws status to Online when open connection', () => {
        expect(reducer({
            ...initialState,
            connectionError: "some string",
        }, feedWsOpen)).toStrictEqual({
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
        expect(reducer(temporaryState, feedWsClose)).toStrictEqual(
            initialState)
    })

    it('should set up error message from action payload', () => {
        const action = {
            payload: 'Error message',
            type: 'FEED_WS_ERROR',
        }

        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            connectionError: 'Error message',
        })
    })

    it('should fill orders field with orders data', () => {
        const action = {
            type: 'FEED_WS_MESSAGE',
            payload: feedOrders,
        }
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            orders: feedOrders,
        })
    })

    it('should update status when connecting is in progress', () => {
        expect(reducer(initialState, feedWsConnecting)).toStrictEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING,
        })
    })

    it('should return initial state', () => {
        expect(reducer(initialState, {type: ""})).toEqual(initialState);
    })

})