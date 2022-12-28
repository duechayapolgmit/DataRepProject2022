import React from 'react';
import Login from '../Login';
import useToken from '../../hooks/useToken';
import { Button, Container, Form, Heading } from 'react-bulma-components';

import BackEnd_Nav from './BackEnd_Nav';

export default function BackEnd_Landing(){
    // Token functionalities -- login
    // if user doesn't have a token, forced them to be in Login component
    const { token, setToken } = useToken();

    if (!token){
        return <Login setToken={setToken}></Login>
    }
    
    return (
        <div>
            <BackEnd_Nav/>
            <Container>
                <Heading>Landing Page</Heading>
                <Button backgroundColor="success"><a className="adminLink" href="admin/add">Add Player</a></Button>
                <Button backgroundColor="warning"><a className="adminLink" href="admin/edit">Edit Player</a></Button>
                <Button backgroundColor="danger"><a className="adminLink" href="admin/delete">Delete Player</a></Button>
            </Container>
        </div>
    )
}