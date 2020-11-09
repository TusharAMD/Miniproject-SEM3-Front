import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
    return ( 
        <Navbar bg="dark" variant="dark" className="mb-1">
            <Navbar.Brand href="/Home">Trickk</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/Encrypt">Encrypt</Nav.Link>
            <Nav.Link href="/Decrypt">Decrypt</Nav.Link>
            <Nav.Link href="/ImageList">ImageList (Decrypt)</Nav.Link>
            <Nav.Link href="/ImageList1">ImageList (Encrypt)</Nav.Link>
            </Nav>
        </Navbar>
     );
}
 
export default Navigation;