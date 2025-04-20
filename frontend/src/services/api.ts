import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Cliente API
export const getClientes = () => axios.get(`${API_URL}/clientes`);
export const getClienteById = (id: string) => axios.get(`${API_URL}/clientes/${id}`);
export const createCliente = (clienteData: any) => axios.post(`${API_URL}/clientes`, clienteData);
export const updateCliente = (id: string, clienteData: any) => axios.put(`${API_URL}/clientes/${id}`, clienteData);
export const deleteCliente = (id: string) => axios.delete(`${API_URL}/clientes/${id}`);

// Tipo de Serviço API
export const getTiposServico = () => axios.get(`${API_URL}/tipos-servico`);
export const getTipoServicoById = (id: string) => axios.get(`${API_URL}/tipos-servico/${id}`);
export const createTipoServico = (tipoServicoData: any) => axios.post(`${API_URL}/tipos-servico`, tipoServicoData);
export const updateTipoServico = (id: string, tipoServicoData: any) => axios.put(`${API_URL}/tipos-servico/${id}`, tipoServicoData);
export const deleteTipoServico = (id: string) => axios.delete(`${API_URL}/tipos-servico/${id}`);

// Ordem de Serviço API
export const getOrdensServico = () => axios.get(`${API_URL}/ordens-servico`);
export const getOrdemServicoById = (id: string) => axios.get(`${API_URL}/ordens-servico/${id}`);
export const createOrdemServico = (ordemServicoData: FormData) => axios.post(`${API_URL}/ordens-servico`, ordemServicoData);
export const updateOrdemServico = (id: string, ordemServicoData: FormData) => axios.put(`${API_URL}/ordens-servico/${id}`, ordemServicoData);
export const deleteOrdemServico = (id: string) => axios.delete(`${API_URL}/ordens-servico/${id}`);
export const filtrarOrdensServico = (filtros: any) => axios.get(`${API_URL}/ordens-servico/filtrar`, { params: filtros });
