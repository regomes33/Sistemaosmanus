const OrdemServico = require('../models/OrdemServico');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Apenas imagens são permitidas!'));
};

// Configuração do upload
exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB
});

// @desc    Obter todas as ordens de serviço
// @route   GET /api/ordens-servico
// @access  Public
exports.getOrdensServico = async (req, res) => {
  try {
    const ordensServico = await OrdemServico.find()
      .populate('cliente', 'nome telefone')
      .populate('tipoServico', 'nome')
      .sort({ dataCriacao: -1 });
    
    res.status(200).json(ordensServico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ordens de serviço', error: error.message });
  }
};

// @desc    Filtrar ordens de serviço
// @route   GET /api/ordens-servico/filtrar
// @access  Public
exports.filtrarOrdensServico = async (req, res) => {
  try {
    const { cliente, status, dataInicio, dataFim } = req.query;
    const filtro = {};
    
    if (cliente) {
      filtro.cliente = cliente;
    }
    
    if (status) {
      filtro.status = status;
    }
    
    if (dataInicio || dataFim) {
      filtro.dataCriacao = {};
      
      if (dataInicio) {
        filtro.dataCriacao.$gte = new Date(dataInicio);
      }
      
      if (dataFim) {
        filtro.dataCriacao.$lte = new Date(dataFim);
      }
    }
    
    const ordensServico = await OrdemServico.find(filtro)
      .populate('cliente', 'nome telefone')
      .populate('tipoServico', 'nome')
      .sort({ dataCriacao: -1 });
    
    res.status(200).json(ordensServico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao filtrar ordens de serviço', error: error.message });
  }
};

// @desc    Obter uma ordem de serviço pelo ID
// @route   GET /api/ordens-servico/:id
// @access  Public
exports.getOrdemServicoById = async (req, res) => {
  try {
    const ordemServico = await OrdemServico.findById(req.params.id)
      .populate('cliente')
      .populate('tipoServico');
    
    if (!ordemServico) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
    
    res.status(200).json(ordemServico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ordem de serviço', error: error.message });
  }
};

// @desc    Criar uma nova ordem de serviço
// @route   POST /api/ordens-servico
// @access  Public
exports.createOrdemServico = async (req, res) => {
  try {
    const { cliente, tipoServico, enderecoExecucao, status, observacoes } = req.body;
    
    const ordemServicoData = {
      cliente,
      tipoServico,
      enderecoExecucao,
      status,
      observacoes
    };
    
    // Se houver upload de imagem
    if (req.file) {
      ordemServicoData.imagem = `/uploads/${req.file.filename}`;
    }
    
    const ordemServico = await OrdemServico.create(ordemServicoData);
    
    // Popula os dados do cliente e tipo de serviço para retornar
    const ordemPopulada = await OrdemServico.findById(ordemServico._id)
      .populate('cliente', 'nome telefone')
      .populate('tipoServico', 'nome');
    
    res.status(201).json(ordemPopulada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar ordem de serviço', error: error.message });
  }
};

// @desc    Atualizar uma ordem de serviço
// @route   PUT /api/ordens-servico/:id
// @access  Public
exports.updateOrdemServico = async (req, res) => {
  try {
    const { cliente, tipoServico, enderecoExecucao, status, observacoes } = req.body;
    
    const ordemServico = await OrdemServico.findById(req.params.id);
    
    if (!ordemServico) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
    
    // Atualiza os campos
    ordemServico.cliente = cliente || ordemServico.cliente;
    ordemServico.tipoServico = tipoServico || ordemServico.tipoServico;
    ordemServico.enderecoExecucao = enderecoExecucao || ordemServico.enderecoExecucao;
    ordemServico.status = status || ordemServico.status;
    ordemServico.observacoes = observacoes || ordemServico.observacoes;
    
    // Se houver upload de nova imagem
    if (req.file) {
      // Remove a imagem anterior se existir
      if (ordemServico.imagem) {
        const imagemPath = path.join(__dirname, '..', ordemServico.imagem);
        if (fs.existsSync(imagemPath)) {
          fs.unlinkSync(imagemPath);
        }
      }
      
      ordemServico.imagem = `/uploads/${req.file.filename}`;
    }
    
    await ordemServico.save();
    
    // Popula os dados do cliente e tipo de serviço para retornar
    const ordemAtualizada = await OrdemServico.findById(ordemServico._id)
      .populate('cliente', 'nome telefone')
      .populate('tipoServico', 'nome');
    
    res.status(200).json(ordemAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar ordem de serviço', error: error.message });
  }
};

// @desc    Excluir uma ordem de serviço
// @route   DELETE /api/ordens-servico/:id
// @access  Public
exports.deleteOrdemServico = async (req, res) => {
  try {
    const ordemServico = await OrdemServico.findById(req.params.id);
    
    if (!ordemServico) {
      return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
    }
    
    // Remove a imagem se existir
    if (ordemServico.imagem) {
      const imagemPath = path.join(__dirname, '..', ordemServico.imagem);
      if (fs.existsSync(imagemPath)) {
        fs.unlinkSync(imagemPath);
      }
    }
    
    await ordemServico.remove();
    
    res.status(200).json({ message: 'Ordem de serviço removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir ordem de serviço', error: error.message });
  }
};
