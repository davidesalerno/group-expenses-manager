import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="mb-3">💰 Group Expenses Manager</h5>
            <p className="text-muted mb-0">
              Gestisce facilmente le spese condivise del tuo gruppo
            </p>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3">Funzionalità</h6>
            <ul className="list-unstyled">
              <li><small className="text-muted">Gestione Transazioni</small></li>
              <li><small className="text-muted">Gruppi e Membri</small></li>
              <li><small className="text-muted">Riepiloghi</small></li>
              <li><small className="text-muted">Divisione Spese</small></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6 className="mb-3">Supporto</h6>
            <ul className="list-unstyled">
              <li><small className="text-muted">Documentazione</small></li>
              <li><small className="text-muted">FAQ</small></li>
              <li><small className="text-muted">Contatti</small></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <small className="text-muted">
              © {currentYear} Group Expenses Manager. Tutti i diritti riservati.
            </small>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="text-muted">
              Sviluppato con ❤️ usando React e Bootstrap
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer