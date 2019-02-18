const uuidv4 = require('uuid/v4')

/**
 * Creates a new user
 * 
 * @param user [Object] {username: [String]}
 * 
 * Returns [Object] {id: [uuid/v4], username: [String]}
 */
const createUser = ({username = ""}) => ({
    id: uuidv4(),
    username
})

/**
 * Creats a new message
 * 
 * @param [Object] {message: [String], sender: [String]}
 * 
 * Returns [Object] {id: [uuidv4], time: [String], date, [Date], message: [String], sender: [String]}
 */
const createMessage = ({message = "", sender = ""}) => ({
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    date: new Date(),
    message,
    sender
})

/**
 * Re-formats the date to time
 * 
 * @param  date [Date]
 * 
 * Returns [String]: time format eg. "12:42"
 */
const getTime = date => `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`


/**
 * Creates a new chat
 * 
 * @param [Object] {message: [Array], name: [String], users: [Array]}
 * 
 * Returns [Object] {id: [uuidv4], name: [String], messages: [Array], users: [Array], typingUsers: [Array]}
 */
const createChat = ({messages = [], name = 'COMMUNITY_CHAT', users = []}) => ({
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers: []
})

module.exports = {
    createUser,
    createMessage,
    createChat
}