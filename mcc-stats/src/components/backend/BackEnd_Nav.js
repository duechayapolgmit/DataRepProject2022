import React from 'react';
import { Navbar } from 'react-bulma-components';

export default class BackEnd_Nav extends React.Component {
    logOut(){
        localStorage.removeItem('token')
    }

    render(){
        return (
            <div>
                <Navbar backgroundColor="link">
                    <Navbar.Item backgroundColor="info" textColor="white" href="/admin"><b>MCC Stats (Admin)</b></Navbar.Item>
                    <Navbar.Item backgroundColor="link" textColor="white" href="/admin/add">Add Player</Navbar.Item>
                    <Navbar.Item backgroundColor="link" textColor="white" href="/admin/edit">Edit Player</Navbar.Item>
                    <Navbar.Item backgroundColor="link" textColor="white" href="/admin/delete">Delete Player</Navbar.Item>
                    <Navbar.Item backgroundColor="mcc" textColor="white" href="/" onClick={this.logOut}>Logout</Navbar.Item>
                    <Navbar.Container align="right">
                        <Navbar.Item backgroundColor="mcc" textColor="white" href="/">Home</Navbar.Item>
                    </Navbar.Container>
                </Navbar><br/>
            </div>
        )
        
    }
}