# Sistema de Ordem de Serviço - Documentação

## Visão Geral

Este sistema de ordem de serviço foi desenvolvido para gerenciar clientes, tipos de serviço e ordens de serviço, com funcionalidades completas na web e em dispositivos móveis. O sistema possui uma arquitetura cliente-servidor, com um backend em Node.js/Express e um frontend em React/TypeScript.

---

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

### Backend (API RESTful)

**Tecnologias**: Node.js, Express, MongoDB, Mongoose

**Estrutura de diretórios**:
- `/config`: Configurações do sistema, incluindo conexão com o banco de dados
- `/controllers`: Controladores para manipulação de dados
- `/models`: Modelos de dados (schemas do Mongoose)
- `/routes`: Rotas da API
- `/uploads`: Diretório para armazenamento de imagens enviadas
- `/tests`: Testes do sistema

### Frontend (Interface de Usuário)

**Tecnologias**: React, TypeScript, Bootstrap, React Router

**Estrutura de diretórios**:
- `/src/components`: Componentes React
  - `/clientes`: Componentes para gerenciamento de clientes
  - `/tiposServico`: Componentes para gerenciamento de tipos de serviço
  - `/ordensServico`: Componentes para gerenciamento de ordens de serviço
- `/src/services`: Serviços para comunicação com a API

---

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

---

## Requisitos de Sistema

### Backend
- Node.js (v14+)
- MongoDB (v4+)
- NPM ou Yarn

### Frontend
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Suporte a dispositivos móveis através de design responsivo

---

## Instalação e Configuração

### Backend
1. Clone o repositório
2. Navegue até o diretório `backend`
3. Execute `npm install` para instalar as dependências
4. Crie um arquivo `.env` com as seguintes variáveis:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ordem-servico
JWT_SECRET=ordem_servico_secret_key
