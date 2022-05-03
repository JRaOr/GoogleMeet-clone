import Api from '../../util/Api';
import * as types from './actionTypes';

export function signin(username, password) {
    return async (dispatch) => {
        const response = await Api.getInstance().SignIn(username, password);
        if (response && response.success) {
            const data = {
                token: response.data.token,
                username: username,
                userId: response.data.userId,
                email: response.data.email,
                avatar: response.data.avatar,
                name: response.data.name
            }
            dispatch({ type: types.LOGIN_SUCCESS, payload: data });
        }
    }
}

export function signout() {
    return async (dispatch) => {
        dispatch({ type: types.SIGNOUT });
    }
}

export function fillUser() {
    return async (dispatch) => {
        const response = await Api.getInstance().checkUser();
        if (response && response.success) {
            const data = {
                token: response.data.token,
                username: response.data.username,
                userId: response.data.userId,
                email: response.data.email,
                avatar: response.data.avatar,
                name: response.data.name
            }
            dispatch({ type: types.LOGIN_SUCCESS, payload: data });
        }
    }
}

export function showEmailModal(roomLink) {
    return async (dispatch) => {
        dispatch({ type: types.SHOW_EMAIL_MODAL, payload: roomLink });
    }
}

export function hideEmailModal() {
    return async (dispatch) => {
        dispatch({ type: types.HIDE_EMAIL_MODAL });
    }
}

export const showProfileModal = (payload) => ({type: types.SHOW_PROFILE_MODAL, payload: payload});
export const hideProfileModal = (payload) => ({type: types.HIDE_PROFILE_MODAL, payload: payload});
