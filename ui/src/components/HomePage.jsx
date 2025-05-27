import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const HomePage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col lg={8} className="mx-auto text-center">
          <h1 className="display-4 fw-bold text-primary mb-4">
            Benvenuto in Group Expenses Manager
          </h1>
          <p className="lead text-muted mb-4">
            La soluzione semplice e potente per gestire le spese condivise 
            del tuo gruppo. Tieni traccia, dividi e semplifica i tuoi pagamenti.
          </p>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <span style={{ fontSize: '3rem' }}>💳</span>
              </div>
              <Card.Title className="h5 mb-3">Gestione Transazioni</Card.Title>
              <Card.Text className="text-muted mb-4">
                Aggiungi, modifica e visualizza tutte le transazioni del gruppo.
                Tieni traccia di chi ha pagato cosa.
              </Card.Text>
              <LinkContainer to="/transactions">
                <Button variant="primary" size="sm">
                  Vai alle Transazioni
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <span style={{ fontSize: '3rem' }}>👥</span>
              </div>
              <Card.Title className="h5 mb-3">Gestione Gruppi</Card.Title>
              <Card.Text className="text-muted mb-4">
                Crea e gestisci i tuoi gruppi di spesa. 
                Aggiungi membri e organizza le tue attività.
              </Card.Text>
              <LinkContainer to="/groups">
                <Button variant="success" size="sm">
                  Gestisci Gruppi
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <span style={{ fontSize: '3rem' }}>📊</span>
              </div>
              <Card.Title className="h5 mb-3">Riepiloghi</Card.Title>
              <Card.Text className="text-muted mb-4">
                Visualizza riepiloghi dettagliati e calcola automaticamente 
                chi deve cosa a chi.
              </Card.Text>
              <LinkContainer to="/transactions/summary">
                <Button variant="info" size="sm">
                  Vedi Riepilogo
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col lg={8} className="mx-auto">
          <Card className="bg-light border-0">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">Inizia subito!</h5>
                  <p className="text-muted mb-0">
                    Aggiungi la tua prima transazione o crea un nuovo gruppo per iniziare.
                  </p>
                </Col>
                <Col md={4} className="text-md-end">
                  <LinkContainer to="/transactions/add">
                    <Button variant="primary" size="lg">
                      Aggiungi Transazione
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage