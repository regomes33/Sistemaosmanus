import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getClientes } from '../../services/api';

interface Cliente {
  _id: string;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await getClientes();
        setClientes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar clientes');
        setLoading(false);
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) || 
    cliente.documento.includes(filtro) ||
    cliente.telefone.includes(filtro) ||
    cliente.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Clientes</h2>
        </Col>
        <Col className="text-end">
          <Link to="/clientes/novo">
            <Button variant="primary">Novo Cliente</Button>
          </Link>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group controlId="filtroCliente">
              <Form.Label>Buscar Cliente</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite nome, documento, telefone ou email" 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Cidade/UF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{`${cliente.endereco.cidade}/${cliente.endereco.estado}`}</td>
                  <td>
                    <Link to={`/clientes/editar/${cliente._id}`}>
                      <Button variant="info" size="sm" className="me-2">Editar</Button>
                    </Link>
                    <Link to={`/clientes/${cliente._id}`}>
                      <Button variant="secondary" size="sm">Detalhes</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">Nenhum cliente encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ClientesList;
