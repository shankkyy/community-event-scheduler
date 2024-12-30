import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';

function CreateEvent() {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
        attendees: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const attendeesArray = eventData.attendees.split(',').map(attendee => attendee.trim());
        const dataToSubmit = { ...eventData, attendees: attendeesArray };

        axios.post('https://community-event-scheduler.onrender.com/api/events/add', dataToSubmit)
            .then(response => {
                console.log(response.data);
                setEventData({
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                    organizer: '',
                    attendees: ''
                });
                alert("event added successfully")
            })
            .catch(error => {
                alert("There was an error creating the event!")
                console.error("There was an error creating the event!", error);
            });
    };

    return (
        <div style={styles.outerCard}>
            <Card style={styles.cardContent}>
                <h3 className="text-center">Create New Event</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={eventData.title}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            value={eventData.description}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="date"
                            value={eventData.date}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input
                            type="time"
                            name="time"
                            id="time"
                            value={eventData.time}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            id="location"
                            value={eventData.location}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="organizer">Organizer</Label>
                        <Input
                            type="text"
                            name="organizer"
                            id="organizer"
                            value={eventData.organizer}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attendees">Attendees</Label>
                        <Input
                            type="text"
                            name="attendees"
                            id="attendees"
                            value={eventData.attendees}
                            onChange={handleChange}
                            placeholder=" attendees email separated by commas make sure to include the @gmail.com"
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" block>Create Event</Button>
                </Form>
            </Card>
        </div>
    );
}

const styles = {
    outerCard: {
        margin: 0,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    cardContent: {
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        background: '#f9f9f9',
    }
};

export default CreateEvent;
