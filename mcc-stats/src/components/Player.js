import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Container, Heading, Table } from 'react-bulma-components';
import { useParams } from 'react-router-dom';

export default function Player(){

    let {name} = useParams();

    const [player, setPlayer] = useState("");
    const [uuid, setUUID] = useState("");
    const [isLoading, setLoading] = useState(true);

    // Runs when component output rendered to DOM and get updated data
    useEffect(()=>{
        axios.get('http://localhost:4000/api/playerHistory/'+name)
        .then((response)=>{
            setPlayer(response.data) // set state for players
            getPlayerHead();
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

    function getPlayerHead(){
        axios.get('http://localhost:4000/api/uuid/'+name)
        .then ( (uuid) => {
            setUUID(uuid.data);
        })
    }

    return (
        <div className="Event">
            <Nav/>
            <Container>
                <Heading>
                    <div className="pictureCentre">
                        <img src={`https://crafatar.com/avatars/${uuid}?overlay`} width={"30"}/> {name}
                    </div></Heading>
                <Table>
                <tbody>
                    <tr>
                        <th>Event</th>
                        <th>Team</th>
                        <th>Placement</th>
                        <th>Coins</th>
                    </tr>
                    <Events events={player}/>
                </tbody>
                </Table>
            </Container>
        </div>
    )
}

class Events extends React.Component {
    render(){
        return this.props.events.map(
            (data) => {
                return <EventItem data={data} key={data._id} componentDidMount={this.props.componentDidMount}></EventItem>
            }
        )
    }
}

// Player Row for each player (called from above)
class EventItem extends React.Component {

    event;


    render(){
        this.event = "mcc"+this.props.data.event.substring(4);
        return (
                <tr>
                    <td><a href={`/event/${this.event}`}>{this.props.data.event}</a></td>
                    <td>{this.props.data.team}</td>
                    <td>{this.props.data.place}</td>
                    <td>{this.props.data.points}</td>
                </tr>
            )   
    }
}