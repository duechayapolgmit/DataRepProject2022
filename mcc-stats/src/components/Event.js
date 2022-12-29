import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Container, Heading, Table } from 'react-bulma-components';
import { useParams } from 'react-router-dom';

export default function Event(props){

    let {event} = useParams();

    const [players, setPlayers] = useState("");
    const [isLoading, setLoading] = useState(true);

    // Runs when component output rendered to DOM and get updated data
    useEffect(()=>{
        axios.get('http://localhost:4000/api/event/'+event)
        .then((response)=>{
            setPlayers(response.data) // set state for players
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    if (isLoading){
        return (
            <div className="Loading">
                <p>Retrieving Data</p>
            </div>
        );
    }

    return (
        <div className="Event">
            <Nav/>
            <Container>
                <Heading>MC Championship {event.substring(3)}</Heading>
                <Table>
                <tbody>
                    <tr>
                        <th>Place</th>
                        <th>Team</th>
                        <th>Player</th>
                        <th>Coins</th>
                    </tr>
                    <Players players={players}/>
                </tbody>
                </Table>
            </Container>
        </div>
    )
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

    name = this.props.player.name;
    uuid;

    getPlayerHead(){
        axios.get('http://localhost:4000/api/uuid/'+this.name)
        .then ( (uuid) => {
            return (
                <tr>
                    <td>{this.props.player.place}</td>
                    <td>{this.props.player.team}</td>
                    <td><img src={`https://crafatar.com/avatars/${uuid}?overlay`} width={"20"}/> {this.name}</td>
                    <td>{this.props.player.points}</td>
                </tr>
            )}
        )
    }

    render(){
        if (this.props.player.player_data.length == 0) this.getPlayerHead();
        else {
            return (
                <tr>
                    <td>{this.props.player.place}</td>
                    <td>{this.props.player.team}</td>
                    <td><img src={`https://crafatar.com/avatars/${this.props.player.player_data[0].uuid}?overlay`} width={"20"}/> {this.name}</td>
                    <td>{this.props.player.points}</td>
                </tr>
            )
        }
        
    }
}