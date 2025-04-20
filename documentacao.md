# Sistema de Ordem de Serviço - Documentação

## Visão Geral

Este sistema de ordem de serviço foi desenvolvido para gerenciar clientes, tipos de serviço e ordens de serviço, com funcionalidades completas na web e em dispositivos móveis. O sistema possui uma arquitetura cliente-servidor, com um backend em Node.js/Express e um frontend em React/TypeScript.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

### Backend (API RESTful)

- **Tecnologias**: Node.js, Express, MongoDB, Mongoose
- **Estrutura de diretórios**:
  - `/config`: Configurações do sistema, incluindo conexão com o banco de dados
  - `/controllers`: Controladores para manipulação de dados
  - `/models`: Modelos de dados (schemas do Mongoose)
  - `/routes`: Rotas da API
  - `/uploads`: Diretório para armazenamento de imagens enviadas
  - `/tests`: Testes do sistema

### Frontend (Interface de Usuário)

- **Tecnologias**: React, TypeScript, Bootstrap, React Router
- **Estrutura de diretórios**:
  - `/src/components`: Componentes React
  - `/src/components/clientes`: Componentes para gerenciamento de clientes
  - `/src/components/tiposServico`: Componentes para gerenciamento de tipos de serviço
  - `/src/components/ordensServico`: Componentes para gerenciamento de ordens de serviço
  - `/src/services`: Serviços para comunicação com a API

## Funcionalidades

### Cadastro de Clientes

- Listagem de clientes com busca
- Formulário para cadastro e edição de clientes
- Campos: nome completo, CPF/CNPJ, telefone, e-mail, endereço completo

### Cadastro de Tipos de Serviço

- Listagem de tipos de serviço com busca
- Formulário para cadastro e edição de tipos de serviço
- Campos: nome do tipo de serviço, descrição detalhada

### Gerenciamento de Ordens de Serviço

- Listagem de ordens de serviço com filtros por cliente, status e data
- Formulário para cadastro e edição de ordens de serviço
- Campos: cliente, tipo de serviço, endereço de execução, upload de imagem, status, observações
- Visualização de detalhes da ordem de serviço

## Requisitos de Sistema

### Backend

- Node.js (v14+)
- MongoDB (v4+)
- NPM ou Yarn

### Frontend

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Suporte a dispositivos móveis através de design responsivo

## Instalação e Configuração

### Backend

1. Clone o repositório
2. Navegue até o diretório `backend`
3. Execute `npm install` para instalar as dependências
4. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ordem-servico
   JWT_SECRET=ordem_servico_secret_key
   ```
5. Execute `npm start` para iniciar o servidor

### Frontend

1. Navegue até o diretório `frontend`
2. Execute `npm install` para instalar as dependências
3. Execute `npm start` para iniciar o servidor de desenvolvimento
4. Para build de produção, execute `npm run build`

## API Endpoints

### Clientes

- `GET /api/clientes` - Listar todos os clientes
- `GET /api/clientes/:id` - Obter cliente por ID
- `POST /api/clientes` - Criar novo cliente
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Excluir cliente

### Tipos de Serviço

- `GET /api/tipos-servico` - Listar todos os tipos de serviço
- `GET /api/tipos-servico/:id` - Obter tipo de serviço por ID
- `POST /api/tipos-servico` - Criar novo tipo de serviço
- `PUT /api/tipos-servico/:id` - Atualizar tipo de serviço
- `DELETE /api/tipos-servico/:id` - Excluir tipo de serviço

### Ordens de Serviço

- `GET /api/ordens-servico` - Listar todas as ordens de serviço
- `GET /api/ordens-servico/filtrar` - Filtrar ordens de serviço
- `GET /api/ordens-servico/:id` - Obter ordem de serviço por ID
- `POST /api/ordens-servico` - Criar nova ordem de serviço
- `PUT /api/ordens-servico/:id` - Atualizar ordem de serviço
- `DELETE /api/ordens-servico/:id` - Excluir ordem de serviço

## Implantação

### Frontend

O frontend está implantado e disponível em: https://tbuwoxkf.manus.space

### Backend

Para implantação do backend em produção:

1. Configure um servidor MongoDB (local ou em nuvem)
2. Implante o código backend em um servidor Node.js
3. Configure as variáveis de ambiente para produção
4. Atualize a URL da API no frontend para apontar para o backend em produção

## Considerações de Segurança

- Implemente autenticação e autorização em ambiente de produção
- Utilize HTTPS para todas as comunicações
- Valide todos os dados de entrada no servidor
- Implemente rate limiting para prevenir ataques de força bruta

## Manutenção e Suporte

Para manutenção e suporte do sistema:

1. Mantenha as dependências atualizadas
2. Faça backup regular do banco de dados
3. Monitore logs de erro para identificar problemas
4. Implemente testes automatizados para novas funcionalidades

## Conclusão

Este sistema de ordem de serviço fornece uma solução completa para gerenciamento de clientes, tipos de serviço e ordens de serviço, com uma interface responsiva que funciona tanto em navegadores desktop quanto em dispositivos móveis. O código-fonte está organizado de forma modular e segue boas práticas de desenvolvimento, facilitando a manutenção e extensão do sistema.
