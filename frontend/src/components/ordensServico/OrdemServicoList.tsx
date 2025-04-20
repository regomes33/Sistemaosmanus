import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOrdensServico, filtrarOrdensServico, getClientes, getTiposServico } from '../../services/api';

interface Cliente {
  _id: string;
  nome: string;
}

interface TipoServico {
  _id: string;
  nome: string;
}

interface OrdemServico {
  _id: string;
  cliente: Cliente;
  tipoServico: TipoServico;
  enderecoExecucao: string;
  imagem: string;
  dataCriacao: string;
  status: string;
}

const OrdemServicoList = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtros
  const [clienteId, setClienteId] = useState('');
  const [status, setStatus] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordensResponse, clientesResponse] = await Promise.all([
          getOrdensServico(),
          getClientes()
        ]);
        
        setOrdensServico(ordensResponse.data);
        setClientes(clientesResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar dados');
        setLoading(false);
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleFiltrar = async () => {
    try {
      setLoading(true);
      
      const filtros: any = {};
      if (clienteId) filtros.cliente = clienteId;
      if (status) filtros.status = status;
      if (dataInicio) filtros.dataInicio = dataInicio;
      if (dataFim) filtros.dataFim = dataFim;
      
      const response = await filtrarOrdensServico(filtros);
      setOrdensServico(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao filtrar ordens de serviço');
      setLoading(false);
      console.error('Erro ao filtrar:', error);
    }
  };

  const handleLimparFiltros = async () => {
    setClienteId('');
    setStatus('');
    setDataInicio('');
    setDataFim('');
    
    try {
      setLoading(true);
      const response = await getOrdensServico();
      setOrdensServico(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar ordens de serviço');
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge bg="warning">Pendente</Badge>;
      case 'em andamento':
        return <Badge bg="primary">Em Andamento</Badge>;
      case 'finalizada':
        return <Badge bg="success">Finalizada</Badge>;
      case 'cancelada':
        return <Badge bg="danger">Cancelada</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Ordens de Serviço</h2>
        </Col>
        <Col className="text-end">
          <Link to="/ordens-servico/nova">
            <Button variant="primary">Nova Ordem de Serviço</Button>
          </Link>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="filtroCliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select 
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                  >
                    <option value="">Todos os clientes</option>
                    {clientes.map(cliente => (
                      <option key={cliente._id} value={cliente._id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group controlId="filtroStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Todos os status</option>
                    <option value="pendente">Pendente</option>
                    <option value="em andamento">Em Andamento</option>
                    <option value="finalizada">Finalizada</option>
                    <option value="cancelada">Cancelada</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="filtroDataInicio">
                  <Form.Label>Data Início</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group controlId="filtroDataFim">
                  <Form.Label>Data Fim</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleLimparFiltros}>
                Limpar Filtros
              </Button>
              <Button variant="primary" onClick={handleFiltrar}>
                Filtrar
              </Button>
            </div>
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
              <th>Cliente</th>
              <th>Tipo de Serviço</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordensServico.length > 0 ? (
              ordensServico.map((ordem) => (
                <tr key={ordem._id}>
                  <td>{ordem.cliente?.nome || 'N/A'}</td>
                  <td>{ordem.tipoServico?.nome || 'N/A'}</td>
                  <td>{formatarData(ordem.dataCriacao)}</td>
                  <td>{getStatusBadge(ordem.status)}</td>
                  <td>
                    <Link to={`/ordens-servico/editar/${ordem._id}`}>
                      <Button variant="info" size="sm" className="me-2">Editar</Button>
                    </Link>
                    <Link to={`/ordens-servico/${ordem._id}`}>
                      <Button variant="secondary" size="sm">Detalhes</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">Nenhuma ordem de serviço encontrada</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrdemServicoList;
