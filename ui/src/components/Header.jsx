import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import {LanguageSelector} from "../i18n/index.jsx";

const Header = () => {
  const location = useLocation()

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            💰 Group Expenses Manager
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link active={location.pathname === '/'}>
                🏠 Home
              </Nav.Link>
            </LinkContainer>
            
            <NavDropdown title="💳 Transazioni" id="transactions-dropdown">
              <LinkContainer to="/transactions">
                <NavDropdown.Item>Visualizza Transazioni</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/transactions/add">
                <NavDropdown.Item>Aggiungi Transazione</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/transactions/summary">
                <NavDropdown.Item>Riepilogo</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            
            <NavDropdown title="👥 Gruppi" id="groups-dropdown">
              <LinkContainer to="/groups">
                <NavDropdown.Item>Gestisci Gruppi</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/groups/create">
                <NavDropdown.Item>Crea Gruppo</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/groups/members">
                <NavDropdown.Item>Gestisci Membri</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          
          <Nav>
            <NavDropdown title="⚙️ Impostazioni" id="settings-dropdown" align="end">
              <NavDropdown.Item>Profilo</NavDropdown.Item>
              <NavDropdown.Item>Preferenze</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <LanguageSelector />
      </Container>
    </Navbar>
  )
}

export default Header