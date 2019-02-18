import React from 'react'
import {Form, Button, Container, Message, Grid, Header} from 'semantic-ui-react'
import Events from '../types/Events';

class LoginForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            username: "",
            success: "",
            error: ""
        }
    }

    handleOnChange = e => this.setState({[e.target.name]: e.target.value}) 

    handleOnSubmit = (e) => {
        e.preventDefault()

        const {socket} = this.props
        const {username} = this.state

        this.setState({error: '', success: ''})
        socket.emit(Events.VERIFY_USER, username, ({user, isUser}) => {
            if (isUser){
                this.setState({error: 'Username already taken'})
            }else{
                this.setState({error: '', username: '', success: 'Connection Success'})
                this.props.setUser(user)
                console.log('User created', user, isUser)
            }
        })
    }

    render(){
        const {username, error, success} = this.state
        const {title} = this.props

        return(
            <div className="login-container">
                <Container>
                    <Grid columns="equal">
                        <Grid.Column />
                        <Grid.Column mobile={10} tablet={8} computer={6}>
                            <Header as="h1" className="title">{title}</Header>
                            {success && <Message success content={success}/>}
                            {error && <Message negative content={error}/>}

                            <Form onSubmit={this.handleOnSubmit} className="login-form">
                                <Form.Field>
                                    {/* <label htmlFor="username">Username</label> */}
                                    <Form.Input id="username" name="username" placeholder="Username" type="text" value={username} onChange={this.handleOnChange} />
                                </Form.Field>
                                <Button fluid>Login</Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column />
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default LoginForm