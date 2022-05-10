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
        removeUserImage: '/user/remove/image',
        uploadUserImage: '/user/upload/image',
    },
    room: {
        createRoom: '/room/create',
        joinRoom: '/room/join',
        leaveRoom: '/room/leave',
    }
}