import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importar componentes
import Header from './components/Header';
import ClientesList from './components/clientes/ClientesList';
import ClienteForm from './components/clientes/ClienteForm';
import TipoServicoList from './components/tiposServico/TipoServicoList';
import TipoServicoForm from './components/tiposServico/TipoServicoForm';
import OrdemServicoList from './components/ordensServico/OrdemServicoList';
import OrdemServicoForm from './components/ordensServico/OrdemServicoForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<OrdemServicoList />} />
            <Route path="/clientes" element={<ClientesList />} />
            <Route path="/clientes/novo" element={<ClienteForm />} />
            <Route path="/clientes/editar/:id" element={<ClienteForm />} />
            <Route path="/tipos-servico" element={<TipoServicoList />} />
            <Route path="/tipos-servico/novo" element={<TipoServicoForm />} />
            <Route path="/tipos-servico/editar/:id" element={<TipoServicoForm />} />
            <Route path="/ordens-servico" element={<OrdemServicoList />} />
            <Route path="/ordens-servico/nova" element={<OrdemServicoForm />} />
            <Route path="/ordens-servico/editar/:id" element={<OrdemServicoForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
