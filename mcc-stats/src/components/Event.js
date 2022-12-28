import axios from 'axios';
import React from 'react';
import Nav from './Nav';
import { Container, Heading, Table } from 'react-bulma-components';

export default class Event extends React.Component{

    constructor(){
        super();
        this.componentDidMount = this.componentDidMount.bind(this); // bind method
    }

    // Runs when component output rendered to DOM and get updated data
    componentDidMount(){
        axios.get('http://localhost:4000/api/event/mcc28')
        .then((response)=>{
            this.setState({players:response.data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    // State for Event
    state = {
        players: []
    }

    render(){
        return(
            <div className="Event">
                <Nav/>
                <Container>
                    <Heading>MC Championship 28</Heading>
                    <Table>
                    <tbody>
                        <tr>
                            <th>Place</th>
                            <th>Team</th>
                            <th>Player</th>
                            <th>Coins</th>
                        </tr>
                        <Players players={this.state.players} componentDidMount={this.componentDidMount}/>
                    </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

class Players extends React.Component {
    render(){
        return this.props.players.map(
            (player) => {
                return <PlayerItem player={player} key={player._id} componentDidMount={this.props.componentDidMount}></PlayerItem>
            }
        )
    }
}

// Player Row for each player (called from above)
class PlayerItem extends React.Component {

    constructor(){
        super(); // parent - Players
    }

    //getPlayerHead(){
    //    axios.get()
    //}

    render(){
        return (
            <tr>
                <td>{this.props.player.place}</td>
                <td>{this.props.player.team}</td>
                <td>{this.props.player.head} {this.props.player.name}</td>
                <td>{this.props.player.points}</td>
            </tr>
        )
    }
}