import * as types from './actionTypes';
import Api from '../../util/Api';
const initialState = {
    username: null,
    userId: null,
    email: null,
    avatar: null,
    name: null, 
    ux : {
        profileModal: false,
        emailModal: {
            open: false,
            roomLink: null
        }
    }
};

const user = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            Api.setInstance(action.payload.token);
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload
            };
        case types.SIGNOUT:
            Api.setInstance(null);
            localStorage.removeItem('token');
            return initialState;
        case types.SHOW_PROFILE_MODAL:
            return {
                ...state,
                ux: {
                    ...state.ux,
                    profileModal: true
                }
            };
        case types.HIDE_PROFILE_MODAL:
            return {
                ...state,
                ux: {
                    ...state.ux,
                    profileModal: false
                }
            };
        case types.SHOW_EMAIL_MODAL:
            return {
                ...state,
                ux: {
                    ...state.ux,
                    emailModal: {
                        roomLink: action.payload,
                        open: true
                    }
                }
            };
        case types.HIDE_EMAIL_MODAL:
            return {
                ...state,
                ux: {
                    ...state.ux,
                    emailModal: {
                        roomLink: null,
                        open: false
                    }
                }
            };
        default:
            return state;
    }
}

export default user;
