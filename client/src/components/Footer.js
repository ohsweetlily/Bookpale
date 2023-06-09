import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
    return (
        <>
            <Navbar bg='dark' variant='dark' style={{ height: '90px', margin: '0', padding: '0' }}>
                {' '}
                <Container>
                    <Nav className='me-auto' style={{ justifyContent: 'space-between' }}>
                        <Nav.Link href='#contact'>프로젝트 깃랩</Nav.Link>
                        <Nav.Link href='#copyright'>Copyright</Nav.Link>
                        <Nav.Link href='#teammember'>팀원</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
