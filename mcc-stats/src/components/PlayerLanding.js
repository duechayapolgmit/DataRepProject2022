import axios from "axios";
import React, {useState} from "react";
import { Button, Container, Heading, Form } from "react-bulma-components";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function PlayerLanding(){

    const [name, setName] = useState('');

    const navigate = useNavigate(); // enable navigation across the app

    const handleSubmit = (e) => {
        e.preventDefault();

        // GET REQUEST - get all players
        axios.get('http://localhost:4000/api/player/'+name)
            .then(response => {
                if (response.data == "") {
                    alert("Player not found in the database. Please try again")
                    return;
                }
                navigate('/player/'+name);
            })
    }
    
    return (
        <div>
        <Nav/>
        <Container>
            <Heading>Find Player</Heading>
            <form onSubmit={handleSubmit}>
                <Form.Field>
                    <Form.Label>Enter Name Here</Form.Label>
                    <Form.Control>
                    <Form.Input type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <input type="submit" value="Search"/>
                </Form.Field>
            </form>
        </Container>
        
    </div>
    )
}