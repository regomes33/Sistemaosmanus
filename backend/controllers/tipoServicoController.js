const TipoServico = require('../models/TipoServico');

// @desc    Obter todos os tipos de serviço
// @route   GET /api/tipos-servico
// @access  Public
exports.getTiposServico = async (req, res) => {
  try {
    const tiposServico = await TipoServico.find().sort({ nome: 1 });
    res.status(200).json(tiposServico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tipos de serviço', error: error.message });
  }
};

// @desc    Obter um tipo de serviço pelo ID
// @route   GET /api/tipos-servico/:id
// @access  Public
exports.getTipoServicoById = async (req, res) => {
  try {
    const tipoServico = await TipoServico.findById(req.params.id);
    
    if (!tipoServico) {
      return res.status(404).json({ message: 'Tipo de serviço não encontrado' });
    }
    
    res.status(200).json(tipoServico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tipo de serviço', error: error.message });
  }
};

// @desc    Criar um novo tipo de serviço
// @route   POST /api/tipos-servico
// @access  Public
exports.createTipoServico = async (req, res) => {
  try {
    const tipoServico = await TipoServico.create(req.body);
    res.status(201).json(tipoServico);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar tipo de serviço', error: error.message });
  }
};

// @desc    Atualizar um tipo de serviço
// @route   PUT /api/tipos-servico/:id
// @access  Public
exports.updateTipoServico = async (req, res) => {
  try {
    const tipoServico = await TipoServico.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tipoServico) {
      return res.status(404).json({ message: 'Tipo de serviço não encontrado' });
    }
    
    res.status(200).json(tipoServico);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar tipo de serviço', error: error.message });
  }
};

// @desc    Excluir um tipo de serviço
// @route   DELETE /api/tipos-servico/:id
// @access  Public
exports.deleteTipoServico = async (req, res) => {
  try {
    const tipoServico = await TipoServico.findByIdAndDelete(req.params.id);
    
    if (!tipoServico) {
      return res.status(404).json({ message: 'Tipo de serviço não encontrado' });
    }
    
    res.status(200).json({ message: 'Tipo de serviço removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tipo de serviço', error: error.message });
  }
};
