import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, CardFooter, Container, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/')
            .then(response => {
                setEvents(response.data.reverse());
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/events/delete/${id}`)
            .then(response => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = (id) => {
        navigate(`update/${id}`);
    };

    const handleAdd = (newEvent) => {
        setEvents([newEvent, ...events]);
    };

    return (
        <div>
            <div style={styles.pageBackground}></div>
            <div style={styles.overlay}></div>
            <Container style={{ ...styles.containerContent, marginTop: '20px' }}>
                <h2>Upcoming Events</h2>
                <div className="row">
                    {events.map(event => (
                        <div className="col-md-4" key={event._id} style={{ marginBottom: '20px' }}>
                            <Card style={styles.card}>
                                <CardBody>
                                    <CardTitle tag="h5">{event.title}</CardTitle>
                                    <CardText>{event.description}</CardText>
                                    <CardText><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</CardText>
                                    <CardText><strong>Time:</strong> {event.time}</CardText>
                                    <CardText><strong>Location:</strong> {event.location}</CardText>
                                    <CardText><strong>Organizer:</strong> {event.organizer}</CardText>
                                </CardBody>
                                <CardFooter>
                                    
                    <CardText><strong>Attendees:</strong> {event.attendees[0]} and {Math.floor(Math.random() * 100) } more
                                    </CardText>
                                    <>
                                        <Button color="warning" onClick={() => handleUpdate(event._id)}>Update</Button>
                                        <Button color="danger" onClick={() => handleDelete(event._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                                    </>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

const styles = {
    pageBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        zIndex: -1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    containerContent: {
        position: 'relative',
        zIndex: 1,
    },
    card: {
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }
};

export default EventList;
