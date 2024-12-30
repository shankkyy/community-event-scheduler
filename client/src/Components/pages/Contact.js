import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardImg, CardText } from 'reactstrap';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';

const Experiences = () => {
    const [experienceData, setExperienceData] = useState({
        description: '',
        images: []
    });
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchExperiences = useCallback(() => {
        setLoading(true);
        axios.get('http://localhost:8000/api/experiences')
            .then(response => {
                // console.log('Fetched experiences:', response.data); // Log the response
                setExperiences(response.data);
                                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the experiences!", error);
                setLoading(false);
            });
    }, []);

    // Use debounce to reduce frequency of API calls
    const debouncedFetchExperiences = useCallback(_.debounce(fetchExperiences, 3), []);

    useEffect(() => {
        debouncedFetchExperiences();
    }, [debouncedFetchExperiences]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperienceData({ ...experienceData, [name]: value });
    };

    const handleFileChange = (e) => {
        setExperienceData({ ...experienceData, images: e.target.files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', experienceData.description);
        for (let i = 0; i < experienceData.images.length; i++) {
            formData.append('images', experienceData.images[i]);
        }

        axios.post('http://localhost:8000/api/experiences/add', formData)
            .then(response => {
                // Add the new experience to the existing list
                setExperiences([...experiences, response.data]);
                setExperienceData({
                    description: '',
                    images: []
                });
            })
            .catch(error => {
                console.error("There was an error sharing the experience!", error);
            });
    };

    return (
        <Container style={styles.experiencesContainer}>
            <div className="row">
                <div className="col-md-8">
                    <h1>We Are Here to Listen to Your Experiences</h1>
                    {loading ? (
                        <p>Loading experiences...</p>
                    ) : (
                        <div style={styles.experienceGrid}>
                            {experiences.map((experience, index) => (
                                <Card style={styles.experienceCard} key={index}>
                                    {experience.images.map((image, idx) => (
                                        <LazyLoad key={idx} height={200} offset={100} once>
                                         <CardImg
    top
    src={`http://localhost:8000/${image}`}
    alt="Experience image"
    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} // Fallback image
/>

                                        </LazyLoad>
                                    ))}
                                    <CardBody>
                                        <CardText>{experience.description}</CardText>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="input-card" style={styles.experienceForm}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    value={experienceData.description}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="images">Upload Images</Label>
                                <Input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                    style={styles.input}
                                />
                            </FormGroup>
                            <Button type="submit" color="primary" style={styles.button}>Share Experience</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const styles = {
    experiencesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    experienceGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',
    },
    experienceCard: {
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        transition: 'transform 0.5s ease-in-out',
    },
    experienceForm: {
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        background: '#f9f9f9',
        alignSelf: 'flex-end',
    },
    input: {
        width: '100%',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
    },
};

export default Experiences;
