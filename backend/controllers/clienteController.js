const Cliente = require('../models/Cliente');

// @desc    Obter todos os clientes
// @route   GET /api/clientes
// @access  Public
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ nome: 1 });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
};

// @desc    Obter um cliente pelo ID
// @route   GET /api/clientes/:id
// @access  Public
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
};

// @desc    Criar um novo cliente
// @route   POST /api/clientes
// @access  Public
exports.createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cliente', error: error.message });
  }
};

// @desc    Atualizar um cliente
// @route   PUT /api/clientes/:id
// @access  Public
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
};

// @desc    Excluir um cliente
// @route   DELETE /api/clientes/:id
// @access  Public
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error: error.message });
  }
};
