import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from '../Login';
import useToken from '../../hooks/useToken';
import { Container, Form, Heading } from 'react-bulma-components';

import BackEnd_Nav from './BackEnd_Nav';

export default function BackEnd_EditPlayer(){

    // variable and function for setting variables
    const [place, setPlace] = useState('');
    const [team, setTeam] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [nameOptions, setNameOptions] = useState(null);

    const navigate = useNavigate(); // enable navigation across the app

    // componentDidMount
    useEffect(() => {
       axios.get('http://localhost:4000/api/event/mcc28')
            .then((response)=>{
                let nameOptions = response.data.map((item) => ({
                    "label": item.name,
                    "value": item.name
                }))
                setNameOptions(nameOptions);
                setLoading(false);
            })
    },[]);

    // Token block, only allowed access if have a token
    const { token, setToken } = useToken();
    if (!token){
        return <Login setToken={setToken}></Login>
    }
    // Loading screen, allowing axios to finish retrieving data before rendering
    if (isLoading){
        return (
            <div className="Loading">
                <p>Retrieving Data</p>
            </div>
        );
    }

    // Handle if name is change or not
    const onChangeName = (e) => {
        setLoading(true)
        setName(e.target.value)
        axios.get('http://localhost:4000/api/event/mcc28/'+e.target.value)
            .then((response)=>{
                setPlace(response.data.place);
                setTeam(response.data.team);
                setPoints(response.data.points);
                setLoading(false)
            })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPlayer = {
            place: place,
            team: team,
            name: name,
            points: points
        }

        // PUT REQUEST - put player back to list
        axios.put('http://localhost:4000/api/event/mcc28/'+ name, newPlayer)
            .then((res)=>{
                navigate('/admin')
            })
            .catch();
    }

    return(
        <div>
            <BackEnd_Nav/>
            <Container>
                <Heading>Edit a Player</Heading>
                <form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Form.Label>Name</Form.Label>
                        <Form.Control>
                            <Dropdown options={nameOptions} value={name} onChange={onChangeName}/>
                        </Form.Control>
                    </Form.Field>
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
                        <Form.Label>Coins</Form.Label>
                        <Form.Control>
                            <Form.Input type="number" className="form-control" value={points} onChange={(e)=> setPoints(e.target.value)}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <input type="submit" value="Edit Player"/>
                    </Form.Field>
                </form>
            </Container>
            
        </div>
    )
}

function Dropdown({value, options, onChange}){
    return(
        <Form.Select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </Form.Select>
    )
}