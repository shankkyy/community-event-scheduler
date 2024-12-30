import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          <Col md="4">
            <h5 style={styles.footerH5}>Contact Us</h5>
            <p style={styles.footerP}>Email: contact@example.com</p>
            <p style={styles.footerP}>Phone: +123 456 7890</p>
            <p style={styles.footerP}>Location: 123 Main Street, Anytown, USA</p>
          </Col>
          <Col md="4">
            <h5 style={styles.footerH5}>Follow Us</h5>
            <div className="social-icons" style={styles.socialIcons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>
          <Col md="4">
            <h5 style={styles.footerH5}>Additional Info</h5>
            <p style={styles.footerP}>About Us</p>
            <p style={styles.footerP}>Terms of Service</p>
            <p style={styles.footerP}>Privacy Policy</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  },
  footerH5: {
    marginBottom: '20px',
    color: '#fff',
  },
  footerP: {
    margin: '5px 0',
    color: '#fff',
  },
  socialIcons: {
    marginTop: '10px',
  },
  socialIconsA: {
    color: '#fff',
    margin: '0 10px',
    fontSize: '24px',
    transition: 'color 0.3s ease-in-out',
  },
  socialIconsAHover: {
    color: '#9a3e3e',
  },
};

export default Footer;
