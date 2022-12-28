import React from "react";
import { Container, Heading } from "react-bulma-components";

import Nav from "./Nav";

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Nav/>
                <Container>
                    <Heading>Welcome to MCC Stats</Heading>
                </Container>
            </div>
            
        )
    }
}