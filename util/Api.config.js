export const routes = {
    login : '/login',
    register : '/signup',
    heartbeat : '/heartbeat',
    user: {
        checkUser: '/user/check',
        getPictures: '/picture/collection',
        userImage: '/user/image',
        getUserPicture: '/user/profilePicture',
        sendEmail: '/user/sendEmail',
        checkUserAvailable: '/user/check/available',
    },
    room: {
        createRoom: '/room/create',
        joinRoom: '/room/join',
        leaveRoom: '/room/leave',
    }
}