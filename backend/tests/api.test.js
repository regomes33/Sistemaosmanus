// Script para testar a API do backend
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Função para testar a API de clientes
const testarClientes = async () => {
  console.log('\n===== TESTANDO API DE CLIENTES =====');
  try {
    // Criar um cliente
    console.log('Criando cliente...');
    const novoCliente = {
      nome: 'Cliente Teste',
      documento: '123.456.789-00',
      telefone: '(11) 98765-4321',
      email: 'cliente.teste@email.com',
      endereco: {
        rua: 'Rua Teste',
        numero: '123',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'SP',
        cep: '12345-678'
      }
    };
    
    const clienteResponse = await axios.post(`${API_URL}/clientes`, novoCliente);
    console.log('Cliente criado com sucesso:', clienteResponse.data._id);
    
    const clienteId = clienteResponse.data._id;
    
    // Buscar cliente por ID
    console.log('\nBuscando cliente por ID...');
    const clienteGet = await axios.get(`${API_URL}/clientes/${clienteId}`);
    console.log('Cliente encontrado:', clienteGet.data.nome);
    
    // Atualizar cliente
    console.log('\nAtualizando cliente...');
    const clienteAtualizado = {
      ...novoCliente,
      nome: 'Cliente Teste Atualizado',
      telefone: '(11) 91234-5678'
    };
    
    const clienteUpdateResponse = await axios.put(`${API_URL}/clientes/${clienteId}`, clienteAtualizado);
    console.log('Cliente atualizado:', clienteUpdateResponse.data.nome);
    
    // Listar todos os clientes
    console.log('\nListando todos os clientes...');
    const clientesResponse = await axios.get(`${API_URL}/clientes`);
    console.log(`Total de clientes: ${clientesResponse.data.length}`);
    
    // Excluir cliente
    console.log('\nExcluindo cliente...');
    const clienteDeleteResponse = await axios.delete(`${API_URL}/clientes/${clienteId}`);
    console.log('Cliente excluído:', clienteDeleteResponse.data.message);
    
    console.log('\n✅ TESTES DE CLIENTES CONCLUÍDOS COM SUCESSO');
    return true;
  } catch (error) {
    console.error('❌ ERRO NOS TESTES DE CLIENTES:', error.message);
    if (error.response) {
      console.error('Detalhes do erro:', error.response.data);
    }
    return false;
  }
};

// Função para testar a API de tipos de serviço
const testarTiposServico = async () => {
  console.log('\n===== TESTANDO API DE TIPOS DE SERVIÇO =====');
  try {
    // Criar um tipo de serviço
    console.log('Criando tipo de serviço...');
    const novoTipoServico = {
      nome: 'Tipo de Serviço Teste',
      descricao: 'Descrição detalhada do tipo de serviço de teste'
    };
    
    const tipoServicoResponse = await axios.post(`${API_URL}/tipos-servico`, novoTipoServico);
    console.log('Tipo de serviço criado com sucesso:', tipoServicoResponse.data._id);
    
    const tipoServicoId = tipoServicoResponse.data._id;
    
    // Buscar tipo de serviço por ID
    console.log('\nBuscando tipo de serviço por ID...');
    const tipoServicoGet = await axios.get(`${API_URL}/tipos-servico/${tipoServicoId}`);
    console.log('Tipo de serviço encontrado:', tipoServicoGet.data.nome);
    
    // Atualizar tipo de serviço
    console.log('\nAtualizando tipo de serviço...');
    const tipoServicoAtualizado = {
      ...novoTipoServico,
      nome: 'Tipo de Serviço Teste Atualizado',
      descricao: 'Descrição atualizada do tipo de serviço de teste'
    };
    
    const tipoServicoUpdateResponse = await axios.put(`${API_URL}/tipos-servico/${tipoServicoId}`, tipoServicoAtualizado);
    console.log('Tipo de serviço atualizado:', tipoServicoUpdateResponse.data.nome);
    
    // Listar todos os tipos de serviço
    console.log('\nListando todos os tipos de serviço...');
    const tiposServicoResponse = await axios.get(`${API_URL}/tipos-servico`);
    console.log(`Total de tipos de serviço: ${tiposServicoResponse.data.length}`);
    
    // Não vamos excluir o tipo de serviço para usá-lo no teste de ordens de serviço
    console.log('\n✅ TESTES DE TIPOS DE SERVIÇO CONCLUÍDOS COM SUCESSO');
    return { success: true, tipoServicoId };
  } catch (error) {
    console.error('❌ ERRO NOS TESTES DE TIPOS DE SERVIÇO:', error.message);
    if (error.response) {
      console.error('Detalhes do erro:', error.response.data);
    }
    return { success: false };
  }
};

// Função para testar a API de ordens de serviço
const testarOrdensServico = async (tipoServicoId) => {
  console.log('\n===== TESTANDO API DE ORDENS DE SERVIÇO =====');
  try {
    // Primeiro, precisamos criar um cliente para associar à ordem de serviço
    console.log('Criando cliente para teste de ordem de serviço...');
    const clienteTeste = {
      nome: 'Cliente para Ordem de Serviço',
      documento: '987.654.321-00',
      telefone: '(11) 97654-3210',
      email: 'cliente.ordem@email.com',
      endereco: {
        rua: 'Rua da Ordem',
        numero: '456',
        bairro: 'Bairro da Ordem',
        cidade: 'Cidade da Ordem',
        estado: 'RJ',
        cep: '98765-432'
      }
    };
    
    const clienteResponse = await axios.post(`${API_URL}/clientes`, clienteTeste);
    console.log('Cliente criado com sucesso:', clienteResponse.data._id);
    
    const clienteId = clienteResponse.data._id;
    
    // Criar uma ordem de serviço
    console.log('\nCriando ordem de serviço...');
    const novaOrdemServico = {
      cliente: clienteId,
      tipoServico: tipoServicoId,
      enderecoExecucao: 'Rua da Execução, 789 - Bairro Execução - Cidade Execução/SP',
      status: 'pendente',
      observacoes: 'Observações de teste para a ordem de serviço'
    };
    
    // Como não podemos enviar um arquivo facilmente neste teste, vamos usar apenas os dados
    const ordemServicoResponse = await axios.post(`${API_URL}/ordens-servico`, novaOrdemServico);
    console.log('Ordem de serviço criada com sucesso:', ordemServicoResponse.data._id);
    
    const ordemServicoId = ordemServicoResponse.data._id;
    
    // Buscar ordem de serviço por ID
    console.log('\nBuscando ordem de serviço por ID...');
    const ordemServicoGet = await axios.get(`${API_URL}/ordens-servico/${ordemServicoId}`);
    console.log('Ordem de serviço encontrada, cliente:', ordemServicoGet.data.cliente.nome);
    
    // Atualizar ordem de serviço
    console.log('\nAtualizando ordem de serviço...');
    const ordemServicoAtualizada = {
      ...novaOrdemServico,
      status: 'em andamento',
      observacoes: 'Observações atualizadas para a ordem de serviço'
    };
    
    const ordemServicoUpdateResponse = await axios.put(`${API_URL}/ordens-servico/${ordemServicoId}`, ordemServicoAtualizada);
    console.log('Ordem de serviço atualizada, status:', ordemServicoUpdateResponse.data.status);
    
    // Testar filtro de ordens de serviço
    console.log('\nTestando filtro de ordens de serviço...');
    const filtroResponse = await axios.get(`${API_URL}/ordens-servico/filtrar?cliente=${clienteId}&status=em andamento`);
    console.log(`Total de ordens filtradas: ${filtroResponse.data.length}`);
    
    // Listar todas as ordens de serviço
    console.log('\nListando todas as ordens de serviço...');
    const ordensServicoResponse = await axios.get(`${API_URL}/ordens-servico`);
    console.log(`Total de ordens de serviço: ${ordensServicoResponse.data.length}`);
    
    // Excluir ordem de serviço
    console.log('\nExcluindo ordem de serviço...');
    const ordemServicoDeleteResponse = await axios.delete(`${API_URL}/ordens-servico/${ordemServicoId}`);
    console.log('Ordem de serviço excluída:', ordemServicoDeleteResponse.data.message);
    
    // Excluir cliente criado para o teste
    console.log('\nExcluindo cliente criado para o teste...');
    await axios.delete(`${API_URL}/clientes/${clienteId}`);
    
    // Excluir tipo de serviço criado para o teste
    console.log('\nExcluindo tipo de serviço criado para o teste...');
    await axios.delete(`${API_URL}/tipos-servico/${tipoServicoId}`);
    
    console.log('\n✅ TESTES DE ORDENS DE SERVIÇO CONCLUÍDOS COM SUCESSO');
    return true;
  } catch (error) {
    console.error('❌ ERRO NOS TESTES DE ORDENS DE SERVIÇO:', error.message);
    if (error.response) {
      console.error('Detalhes do erro:', error.response.data);
    }
    return false;
  }
};

// Função principal para executar todos os testes
const executarTestes = async () => {
  console.log('🧪 INICIANDO TESTES DO SISTEMA DE ORDEM DE SERVIÇO');
  
  // Testar API de clientes
  const clientesResult = await testarClientes();
  
  // Testar API de tipos de serviço
  const tiposServicoResult = await testarTiposServico();
  
  // Testar API de ordens de serviço (apenas se os testes anteriores foram bem-sucedidos)
  let ordensServicoResult = false;
  if (clientesResult && tiposServicoResult.success) {
    ordensServicoResult = await testarOrdensServico(tiposServicoResult.tipoServicoId);
  }
  
  // Resumo dos testes
  console.log('\n===== RESUMO DOS TESTES =====');
  console.log(`Clientes: ${clientesResult ? '✅ SUCESSO' : '❌ FALHA'}`);
  console.log(`Tipos de Serviço: ${tiposServicoResult.success ? '✅ SUCESSO' : '❌ FALHA'}`);
  console.log(`Ordens de Serviço: ${ordensServicoResult ? '✅ SUCESSO' : '❌ FALHA'}`);
  
  if (clientesResult && tiposServicoResult.success && ordensServicoResult) {
    console.log('\n🎉 TODOS OS TESTES FORAM CONCLUÍDOS COM SUCESSO!');
  } else {
    console.log('\n⚠️ ALGUNS TESTES FALHARAM. VERIFIQUE OS LOGS ACIMA PARA MAIS DETALHES.');
  }
};

// Executar os testes
executarTestes();
