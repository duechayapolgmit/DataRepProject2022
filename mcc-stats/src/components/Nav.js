import React from 'react';
import { Navbar } from 'react-bulma-components';

export default class Nav extends React.Component {
    render(){
        return (
            <div>
                <Navbar backgroundColor="mcc">
                    <Navbar.Item backgroundColor="mccdark" textColor="white" href="/"><b>MCC Stats</b></Navbar.Item>
                    <Navbar.Item backgroundColor="mcc" textColor="white" href="/event">Event</Navbar.Item>
                    <Navbar.Item backgroundColor="mcc" textColor="white" href="/player">Player</Navbar.Item>
                    <Navbar.Container align="right">
                        <Navbar.Item backgroundColor="link" textColor="white" href="/admin">Admin</Navbar.Item>
                    </Navbar.Container>
                </Navbar><br/>
            </div>
        )
        
    }
}