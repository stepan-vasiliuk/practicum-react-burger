import {initialState} from "../userReducer";
import {userReducer as reducer} from "../userReducer";
import {clearUserData, emailSent, setAuthChecked, setUser, userRegisterFailed} from "../../actions/userActions";

describe('User Reducer checking', () => {

    const jsonDataObject = {
        accessToken: "Bearer 32d3d",
        refreshToken: "32d3d",
        user: {
            email: 'email@email.ru',
            name: 'Vladislav'
        }
    }

    it('should set user', () => {
        expect(reducer(initialState, setUser(jsonDataObject))).toStrictEqual({
            ...initialState,
            user: {
                email: 'email@email.ru',
                name: 'Vladislav'
            },
            isAuthChecked: true,
        })
    })
    it('should set Auth Checked flag to true', () => {
        expect(reducer(initialState, setAuthChecked(true))).toStrictEqual({
            ...initialState,
            isAuthChecked: true,
        })
    })
    it('should clear user data', () => {
        const testUser = jsonDataObject.user;
        expect(reducer({
            ...initialState,
            user: testUser
        }, clearUserData())).toStrictEqual(initialState)
    })

    it('should check flags when register failed', () => {
        expect(reducer(initialState, userRegisterFailed())).toStrictEqual({
            ...initialState,
            isAuthChecked: true,
        })
    })

    it('should check change sent email flag to True', () => {
        expect(reducer(initialState, emailSent(true))).toStrictEqual({
            ...initialState,
            emailSent: true,
        })
    })

    it('should check change sent email flag to False', () => {
        expect(reducer({
            ...initialState,
            emailSent: true,
        }, emailSent(false))).toStrictEqual({
            ...initialState,
            emailSent: false,
        })
    })
    it('should return initial state', () => {
        expect(reducer(initialState, {type: ""})).toEqual(initialState);
    })

})