import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Form, Heading } from 'react-bulma-components';
import axios from "axios";
import Login from '../Login';
import useToken from '../../hooks/useToken';

import BackEnd_Nav from './BackEnd_Nav';

export default function BackEnd_AddPlayer(){
    // variable and function for setting variables
    const [place, setPlace] = useState('');
    const [team, setTeam] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');

    const navigate = useNavigate(); // enable navigation across the app

    // componentDidMount
    useEffect(() => {
        setPlace('');
        setTeam('');
        setName('');
        setPoints('');
    },[]);

    // Token block, only allowed access if have a token
    const { token, setToken } = useToken();
    if (!token){
        return <Login setToken={setToken}></Login>
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPlayer = {
            place: place,
            team: team,
            name: name,
            points: points
        }

        axios.post('http://localhost:4000/api/event/mcc28', newPlayer)
            .then((res)=>{
                console.log('nav')
                navigate('/admin')
                
            })
            .catch();
    }

    return(
        <div>
            <BackEnd_Nav/>
            <Container>
            <Heading>Add Player</Heading>
            <form onSubmit={handleSubmit}>
                <Form.Field>
                    <Form.Label>Placement</Form.Label>
                    <Form.Control>
                        <Form.Input type="number" value={place} onChange={(e)=> setPlace(e.target.value)}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Team</Form.Label>
                    <Form.Control>
                        <Form.Input type="text" value={team} onChange={(e)=> setTeam(e.target.value)}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Player Name</Form.Label>
                    <Form.Control>
                        <Form.Input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Coins Obtained</Form.Label>
                    <Form.Control>
                        <Form.Input type="number" className="form-control" value={points} onChange={(e)=> setPoints(e.target.value)}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Control>
                        <input type="submit" value="Add Player"/>
                    </Form.Control>
                </Form.Field>
            </form> 
            </Container>
            
        </div>
    )
}