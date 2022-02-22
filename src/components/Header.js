import React from 'react'
import { Navbar,Container } from 'react-bootstrap';
import { People } from 'react-bootstrap-icons';

function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                    <People className="ml-4" />
                        Peoples Blog
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header