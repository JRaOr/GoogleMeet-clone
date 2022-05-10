import axios from 'axios';
import { routes } from './Api.config';
class Api {
    static Api = null;

    constructor(headers = {}) {
        var args = {
            baseURL: process.env.NEXT_PUBLIC_API_SERVER,
            headers,
            params: {
                "platform": "web"
            }
        };
        this.base = axios.create(args);
    }
    //Instance
    static getInstance() {
        if (!Api.instance && process.env.NEXT_PUBLIC_API_SERVER) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    static setInstance(token) {
        Api.instance = new Api({
            'Authorization': `bearer ${token}`,
        });
    }

    static setDispatch(dispatch) {
        Api.dispatch = dispatch;
    }

    SignIn = async (username, password) => {
        try {
            const data = {
                username: username,
                password: password
            }
            const response = await this.base.post(routes.login, data);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    SignUp = async (username, password) => {
        try {
            const data = {
                username: username,
                password: password
            }
            const response = await this.base.post(routes.register, data);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    checkUser = async () => {
        try {
            const response = await this.base.get(routes.user.checkUser);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    checkUserAvailable = async (username) => {
        try {
            const response = await this.base.get(`${routes.user.checkUserAvailable}/${username}`);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    setUserImage = async (image) => {
        try {
            const data = {
                image: image
            }
            const response = await this.base.post(routes.user.userImage, data);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    getPictures = async () => {
        try {
            const response = await this.base.get(routes.user.getPictures);
            return {success: true, data: response.data.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    createRoom = async () => {
        try {
            const response = await this.base.get(routes.room.createRoom);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    getRoomAccess = async (roomId) => {
        try {
            const response = await this.base.get(routes.room.joinRoom + `/${roomId}`);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    uploadUserImage = async (file) => {
        try {
            const body = new FormData();
            body.append('file', file);
            const response = await this.base.post(routes.user.uploadUserImage, body);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    removeUserImage = async () => {
        try {
            const response = await this.base.delete(routes.user.removeUserImage);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    getUserPicture = async (username) => {
        try {
            const response = await this.base.get(routes.user.getUserPicture + `/${username}`);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    sendEmail = async (data) => {
        try {
            const response = await this.base.post(routes.user.sendEmail, data);
            return response.data
        } catch (error) {
            return {success: false, data: error.message};
        }
    }

    heartbeat = async () => {
        try {
            const response = await this.base.get(routes.heartbeat);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, data: error.message};
        }
    }
}

export default Api;