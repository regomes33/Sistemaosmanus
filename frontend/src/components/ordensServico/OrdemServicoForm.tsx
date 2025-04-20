import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  getOrdemServicoById, 
  createOrdemServico, 
  updateOrdemServico, 
  getClientes, 
  getTiposServico 
} from '../../services/api';

interface Cliente {
  _id: string;
  nome: string;
}

interface TipoServico {
  _id: string;
  nome: string;
}

interface OrdemServicoFormData {
  cliente: string;
  tipoServico: string;
  enderecoExecucao: string;
  status: string;
  observacoes: string;
}

const initialState: OrdemServicoFormData = {
  cliente: '',
  tipoServico: '',
  enderecoExecucao: '',
  status: 'pendente',
  observacoes: ''
};

const OrdemServicoForm = () => {
  const [formData, setFormData] = useState<OrdemServicoFormData>(initialState);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tiposServico, setTiposServico] = useState<TipoServico[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string>('');
  const [imagemAtual, setImagemAtual] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientesResponse, tiposServicoResponse] = await Promise.all([
          getClientes(),
          getTiposServico()
        ]);
        
        setClientes(clientesResponse.data);
        setTiposServico(tiposServicoResponse.data);
        
        if (id) {
          setIsEditing(true);
          const ordemResponse = await getOrdemServicoById(id);
          const ordem = ordemResponse.data;
          
          setFormData({
            cliente: ordem.cliente._id,
            tipoServico: ordem.tipoServico._id,
            enderecoExecucao: ordem.enderecoExecucao,
            status: ordem.status,
            observacoes: ordem.observacoes || ''
          });
          
          if (ordem.imagem) {
            setImagemAtual(`http://localhost:5000${ordem.imagem}`);
          }
        }
        
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar dados');
        setLoading(false);
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagem(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Criar FormData para envio de arquivo
      const formDataObj = new FormData();
      formDataObj.append('cliente', formData.cliente);
      formDataObj.append('tipoServico', formData.tipoServico);
      formDataObj.append('enderecoExecucao', formData.enderecoExecucao);
      formDataObj.append('status', formData.status);
      
      if (formData.observacoes) {
        formDataObj.append('observacoes', formData.observacoes);
      }
      
      if (imagem) {
        formDataObj.append('imagem', imagem);
      }
      
      if (isEditing && id) {
        await updateOrdemServico(id, formDataObj);
      } else {
        await createOrdemServico(formDataObj);
      }
      
      setLoading(false);
      navigate('/ordens-servico');
    } catch (error) {
      setError('Erro ao salvar ordem de serviço');
      setLoading(false);
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}</h2>
      
      {error && <p className="text-danger">{error}</p>}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="cliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                      <option key={cliente._id} value={cliente._id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="tipoServico">
                  <Form.Label>Tipo de Serviço</Form.Label>
                  <Form.Select
                    name="tipoServico"
                    value={formData.tipoServico}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um tipo de serviço</option>
                    {tiposServico.map(tipo => (
                      <option key={tipo._id} value={tipo._id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="enderecoExecucao">
              <Form.Label>Endereço de Execução</Form.Label>
              <Form.Control
                type="text"
                name="enderecoExecucao"
                value={formData.enderecoExecucao}
                onChange={handleChange}
                required
                placeholder="Endereço completo onde o serviço será executado"
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="finalizada">Finalizada</option>
                <option value="cancelada">Cancelada</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="observacoes">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                placeholder="Observações adicionais sobre o serviço"
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="imagem">
              <Form.Label>Imagem do Serviço</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
              />
              <Form.Text className="text-muted">
                Selecione uma imagem relacionada ao serviço (opcional)
              </Form.Text>
            </Form.Group>
            
            {(previewImagem || imagemAtual) && (
              <div className="mb-3">
                <p>Imagem:</p>
                {previewImagem ? (
                  <Image src={previewImagem} alt="Preview" thumbnail style={{ maxHeight: '200px' }} />
                ) : (
                  <Image src={imagemAtual} alt="Imagem atual" thumbnail style={{ maxHeight: '200px' }} />
                )}
              </div>
            )}
            
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate('/ordens-servico')}>
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

export default OrdemServicoForm;
