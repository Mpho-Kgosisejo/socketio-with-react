const io = require('./index').io
const Events = require('../types/Events')
const Factories = require('../Factories')

let connectedUsers = {}

module.exports = socket => {
    console.log("Client", socket.id)

    /**
     * Verify Username
     */
    socket.on(Events.VERIFY_USER, (username, callback) => {
        if (isUser(connectedUsers, username)){
            callback({isUser: true, user: null})
        }else{
            callback({isUser: false, user: Factories.createUser({username})})
        }
    })

    /**
     * User Connects with Username
     */
    socket.on(Events.USER_CONNECTED, user => {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user

        io.emit(Events.USER_CONNECTED, connectedUsers)
        console.log("USER_CONNECTED", connectedUsers)
    })

    /**
     * User Disconnects
     */

    /**
     * User logouts
     */
}

/**
 * addUser
 */
const addUser = (userList, user) => {
    let newList = Object.assign({}, userList)
    newList[user.username] = user
    return (newList)
}

/**
 * removeUser
 */
const removeUser= (userList, user) => {
    let newList = Object.assign({}, userList)
    delete newList[userList]
    return (newList)
}

/**
 * isUser 
 */
const isUser = (userList, username) => {
    return (username in userList)
}