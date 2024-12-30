import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                navigate('/login');
                alert('Logged out successfully');
            } else {
                const data = await response.json();
                console.error('Logout failed:', data.message);
            }
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const linkStyle = {
        marginRight: '20px',
        textDecoration: 'none',
        color: scrolled ? '#333' : '#fff',
        fontSize: isMobile ? '1.5em' : '2em',
        fontWeight: 'inherit'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        fontSize: isMobile ? '1.5em' : '2em',
        fontWeight: 'inherit',
        color: scrolled ? '#333' : '#fff'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            backgroundColor: scrolled ? '#fff' : 'transparent',
            boxShadow: scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            zIndex: 1000,
            padding: isMobile ? '10px 10px' : '10px 20px',
            transition: 'background-color 0.3s, box-shadow 0.3s'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: isMobile ? 'space-between' : 'flex-end',
                alignItems: 'center'
            }}>
                <div style={{
                    display: isMobile ? 'block' : 'flex',
                    alignItems: 'center',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <Link to="" style={linkStyle}>Upcoming Events</Link>
                    <Link to="create" style={linkStyle}>Create Event</Link>
                    <Link to="contact" style={linkStyle}>Community Meetup</Link>
                    <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
