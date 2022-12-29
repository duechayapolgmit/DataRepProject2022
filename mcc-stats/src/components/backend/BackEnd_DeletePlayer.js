import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from '../Login';
import useToken from '../../hooks/useToken';
import { Container, Form, Heading } from 'react-bulma-components';

import BackEnd_Nav from './BackEnd_Nav';

export default function BackEnd_DeletePlayer(){

    // variable and function for setting variables
    const [name, setName] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [nameOptions, setNameOptions] = useState(null);

    // options for event (a database)
    const [event, setEvent] = useState('mcc26');
    const eventOptions = [
        {
            "label": "MCC 26",
            "value": "mcc26"
        },
        {
            "label": "MCC 28",
            "value": "mcc28"
        }]

    const navigate = useNavigate(); // enable navigation across the app

    // componentDidMount
    useEffect(() => {
        axios.get('http://localhost:4000/api/event/'+event)
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
        return <div className="App">Retrieving Data</div>;
    }

    // Handle if name is change or not
    const onChangeName = (e) => {
        setName(e.target.value)    
    }

    const onChangeEvent = e => {
        setLoading(true)
        setEvent(e.target.value)
        axios.get('http://localhost:4000/api/event/'+e.target.value)
            .then((response)=>{
                let nameOptions = response.data.map((item) => ({
                    "label": item.name,
                    "value": item.name
                }))
                setNameOptions(nameOptions);
                setLoading(false);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // PUT REQUEST - put player back to list
        axios.delete('http://localhost:4000/api/event/'+event+'/'+ name)
            .then((res)=>{
                navigate('/admin')
            })
            .catch();
    }

    return(
        <div>
            <BackEnd_Nav/>
            <Container>
                <Heading>Delete a Player</Heading>
                <form onSubmit={handleSubmit}>
                <Form.Field>
                        <Form.Label>Event</Form.Label>
                        <Form.Control>
                            <Dropdown options={eventOptions} value={event} onChange={onChangeEvent}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Name</Form.Label>
                        <Form.Control>
                            <Dropdown options={nameOptions} value={name} onChange={onChangeName}/>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                        <input type="submit" value="Delete Player (can't be undone)"/>
                        </Form.Control>
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