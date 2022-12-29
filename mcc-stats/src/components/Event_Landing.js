import React from "react";
import { Button, Container, Heading } from "react-bulma-components";
import Nav from "./Nav";

export default class Event_Landing extends React.Component{
    render(){
        return (
            <div>
            <Nav/>
            <Container>
                <Heading>Select Event</Heading>
                <Button color="warning"><a href="/event/mcc26">MCC 26</a></Button>
                <Button color="warning"><a href="/event/mcc28">MCC 28</a></Button>
            </Container>
            
        </div>
        )
        
    }
}