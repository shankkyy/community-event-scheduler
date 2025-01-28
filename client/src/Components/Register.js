import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, CardFooter, Container, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://community-event-scheduler.onrender.com/api/events/')
            .then(response => {
                setEvents(response.data.reverse());
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://community-event-scheduler.onrender.com/api/events/delete/${id}`)
            .then(() => {
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdate = (id) => {
        navigate(`update/${id}`);
    };

    return (
        <div>
            <div style={styles.pageBackground}></div>
            <div style={styles.overlay}></div>
            <Container style={{ ...styles.containerContent, marginTop: '40px' }}>
                <h2 style={styles.heading}>📅 Upcoming Events</h2>
                <div className="row">
                    {events.map(event => (
                        <div className="col-md-4" key={event._id} style={{ marginBottom: '30px' }}>
                            <Card style={styles.card}>
                                <CardBody>
                                    <CardTitle tag="h5" style={styles.cardTitle}>{event.title}</CardTitle>
                                    <CardText style={styles.cardText}>{event.description}</CardText>
                                    <CardText><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</CardText>
                                    <CardText><strong>Time:</strong> {event.time}</CardText>
                                    <CardText><strong>Location:</strong> {event.location}</CardText>
                                    <CardText><strong>Organizer:</strong> {event.organizer}</CardText>
                                </CardBody>
                                <CardFooter style={styles.cardFooter}>
                                    <CardText><strong>Attendees:</strong> {event.attendees[0] || 'Anonymous'} and {event.attendees.length - 1 || Math.floor(Math.random() * 50)} more</CardText>
                                    <div style={styles.buttonGroup}>
                                        <Button color="primary" onClick={() => handleUpdate(event._id)} style={styles.button}>Update</Button>
                                        <Button color="danger" onClick={() => handleDelete(event._id)} style={styles.button}>Delete</Button>
                                    </div>
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
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?events,celebration)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
    },
    containerContent: {
        position: 'relative',
        zIndex: 1,
        color: '#fff',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    },
    cardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
    },
    cardTitle: {
        color: '#333',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    cardText: {
        color: '#555',
        marginBottom: '10px',
    },
    cardFooter: {
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #ddd',
        borderRadius: '0 0 15px 15px',
        padding: '10px 15px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        minWidth: '100px',
    },
};

export default EventList;
