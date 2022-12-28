import React, {useState} from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Heading, Form } from 'react-bulma-components';

// async function for login
export default function Login({setToken}){

    // Use states for username and password
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // Handles when form is submitted
    const handleSubmit = event => {
        event.preventDefault(); // Prevents default value from entering blank
        
        // Login information - state
        const login = {
            username: username,
            password: password
        }

        // POST axios, retrieving response for login
        const response = axios.post('http://localhost:4000/login', 
            JSON.stringify({username, password}),
            {headers: { "Content-Type": "application/json"}})
            .then(result => {
                setToken(result.data.token)
            });
        
        window.location.reload(false)
    }

    // Render form
    return(
        <div>
            <Container>
                <Heading>MCC Stats Admin Login</Heading>
                <form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Form.Label>Username</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" onChange={e => setUsername(e.target.value)}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" onChange={e => setPassword(e.target.value)}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <button type="submit">Login</button>
                        </Form.Control>
                    </Form.Field>
                </form>
            </Container>
            <h1></h1>
                
        </div>  
    )
}

// Prop Types Setup
Login.propTypes = {
    setToken: PropTypes.func.isRequired // make it so that a token is required to access
}
  