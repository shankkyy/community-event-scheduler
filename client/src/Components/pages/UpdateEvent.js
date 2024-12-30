import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function UpdateEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
    
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then(response => {
                setEvent(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/events/update/${id}`, event)
            .then(response => {
                navigate('/home');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Container>
            <h3>Update Event</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" value={event.title} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" value={event.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" name="date" id="date" value={event.date} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="time">Time</Label>
                    <Input type="text" name="time" id="time" value={event.time} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="text" name="location" id="location" value={event.location} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="organizer">Organizer</Label>
                    <Input type="text" name="organizer" id="organizer" value={event.organizer} onChange={handleChange} />
                </FormGroup>
          
                <Button type="submit" color="primary">Update Event</Button>
            </Form>
        </Container>
    );
}



export default (UpdateEvent);
