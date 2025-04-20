import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getClienteById, createCliente, updateCliente } from '../../services/api';

interface ClienteFormData {
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

const initialState: ClienteFormData = {
  nome: '',
  documento: '',
  telefone: '',
  email: '',
  endereco: {
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  }
};

const ClienteForm = () => {
  const [formData, setFormData] = useState<ClienteFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCliente(id);
    }
  }, [id]);

  const fetchCliente = async (clienteId: string) => {
    try {
      setLoading(true);
      const response = await getClienteById(clienteId);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar dados do cliente');
      setLoading(false);
      console.error('Erro ao buscar cliente:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof ClienteFormData] as any,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isEditing && id) {
        await updateCliente(id, formData);
      } else {
        await createCliente(formData);
      }
      
      setLoading(false);
      navigate('/clientes');
    } catch (error) {
      setError('Erro ao salvar cliente');
      setLoading(false);
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      
      {error && <p className="text-danger">{error}</p>}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="documento">
                  <Form.Label>CPF/CNPJ</Form.Label>
                  <Form.Control
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="telefone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <h4 className="mt-4">Endereço</h4>
            
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="endereco.rua">
                  <Form.Label>Rua</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.rua"
                    value={formData.endereco.rua}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={4}>
                <Form.Group className="mb-3" controlId="endereco.numero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.numero"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="endereco.bairro">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.bairro"
                    value={formData.endereco.bairro}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="endereco.cidade">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.cidade"
                    value={formData.endereco.cidade}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="endereco.estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.estado"
                    value={formData.endereco.estado}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="endereco.cep">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco.cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate('/clientes')}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClienteForm;
