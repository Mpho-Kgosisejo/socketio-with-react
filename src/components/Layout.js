import React from 'react'
import io from 'socket.io-client'

import Events from '../types/Events'
import LoginForm from './LoginForm'
import ChatContainer from './chat/ChatContainer'

const socketURL = 'http://192.168.56.1:3231'

const GlobalAlert = () => (
    <div className="global-alert">
        <h5>H5</h5>
        <h6>H6</h6>
    </div>  
)

class Layout extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            socket: null,
            user: null
        }
    }

    /**
     * Connect and initializes Socket [state.socket]
     */
    initSocket = () => {
        const socket = io(socketURL)

        socket.on('connect', () => {
            console.log('Connected to SocketIO', socket.id)
        })
        this.setState({socket})
    }

    /**
     * Sets the user [state.user]
     * 
     * @param user [Object] {id: [Number], name: [String]}
     */
    setUser = (user) => {
        const {socket} = this.state

        socket.emit(Events.USER_CONNECTED, user)
        this.setState({user})
    }

    /**
     * Sets the user [state.user] to null
     */
    logout = () => {
        const {socket} = this.state

        socket.emit(Events.USER_DISCONNECTED)
        this.setState({user: null})
    }

    componentWillMount(){
        this.initSocket() 
    }

    render(){
        const {title} = this.props
        const {socket, user} = this.state

        return(
            <div className="conatiner">
                {user ? 
                    <LoginForm title={title} socket={socket} setUser={this.setUser} /> :
                    <ChatContainer socket={socket} user={user} logout={this.logout} />
                }
                <GlobalAlert />
            </div>
        )
    }
}

export default Layout