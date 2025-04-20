import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTiposServico } from '../../services/api';

interface TipoServico {
  _id: string;
  nome: string;
  descricao: string;
  dataCadastro: string;
}

const TipoServicoList = () => {
  const [tiposServico, setTiposServico] = useState<TipoServico[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTiposServico = async () => {
      try {
        setLoading(true);
        const response = await getTiposServico();
        setTiposServico(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar tipos de serviço');
        setLoading(false);
        console.error('Erro ao buscar tipos de serviço:', error);
      }
    };

    fetchTiposServico();
  }, []);

  const tiposServicoFiltrados = tiposServico.filter(tipo => 
    tipo.nome.toLowerCase().includes(filtro.toLowerCase()) || 
    tipo.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Tipos de Serviço</h2>
        </Col>
        <Col className="text-end">
          <Link to="/tipos-servico/novo">
            <Button variant="primary">Novo Tipo de Serviço</Button>
          </Link>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group controlId="filtroTipoServico">
              <Form.Label>Buscar Tipo de Serviço</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite nome ou descrição" 
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
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tiposServicoFiltrados.length > 0 ? (
              tiposServicoFiltrados.map((tipo) => (
                <tr key={tipo._id}>
                  <td>{tipo.nome}</td>
                  <td>{tipo.descricao.length > 100 ? `${tipo.descricao.substring(0, 100)}...` : tipo.descricao}</td>
                  <td>
                    <Link to={`/tipos-servico/editar/${tipo._id}`}>
                      <Button variant="info" size="sm" className="me-2">Editar</Button>
                    </Link>
                    <Link to={`/tipos-servico/${tipo._id}`}>
                      <Button variant="secondary" size="sm">Detalhes</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">Nenhum tipo de serviço encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TipoServicoList;
