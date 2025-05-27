import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import HomePage from './components/HomePage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { I18nProvider } from './i18n/index.jsx';

function App() {
    const TransactionsApp = React.lazy(() => import('./modules/transaction/TransactionApp.jsx'));

    return (
    <I18nProvider defaultLanguage="en">
        <BrowserRouter>
              <div className="app-container">
                <Header />
                <main className="main-content">
                  <Container fluid>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route 
                        path="/transactions/*" 
                        element={
                          <ErrorBoundary fallback="home.transactionapp.fallback">
                            <Suspense fallback={<LoadingSpinner />}>
                              <TransactionsApp />
                            </Suspense>
                          </ErrorBoundary>
                        } 
                      />
                      <Route 
                        path="/groups/*" 
                        element={
                          <ErrorBoundary fallback="home.groupapp.fallback">
                            <Suspense fallback={<LoadingSpinner />}>
                              <TransactionsApp />
                            </Suspense>
                          </ErrorBoundary>
                        } 
                      />
                    </Routes>
                  </Container>
                </main>
                
                <Footer />
              </div>
            </BrowserRouter>
    </I18nProvider>
  )
}

export default App