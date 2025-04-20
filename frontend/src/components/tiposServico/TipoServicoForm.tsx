import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getTipoServicoById, createTipoServico, updateTipoServico } from '../../services/api';

interface TipoServicoFormData {
  nome: string;
  descricao: string;
}

const initialState: TipoServicoFormData = {
  nome: '',
  descricao: ''
};

const TipoServicoForm = () => {
  const [formData, setFormData] = useState<TipoServicoFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchTipoServico(id);
    }
  }, [id]);

  const fetchTipoServico = async (tipoServicoId: string) => {
    try {
      setLoading(true);
      const response = await getTipoServicoById(tipoServicoId);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar dados do tipo de serviço');
      setLoading(false);
      console.error('Erro ao buscar tipo de serviço:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isEditing && id) {
        await updateTipoServico(id, formData);
      } else {
        await createTipoServico(formData);
      }
      
      setLoading(false);
      navigate('/tipos-servico');
    } catch (error) {
      setError('Erro ao salvar tipo de serviço');
      setLoading(false);
      console.error('Erro ao salvar tipo de serviço:', error);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Tipo de Serviço' : 'Novo Tipo de Serviço'}</h2>
      
      {error && <p className="text-danger">{error}</p>}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do Tipo de Serviço</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição Detalhada</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate('/tipos-servico')}>
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

export default TipoServicoForm;
