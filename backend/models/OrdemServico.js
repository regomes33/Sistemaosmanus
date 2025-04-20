const mongoose = require('mongoose');

const ordemServicoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'Cliente é obrigatório']
  },
  tipoServico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoServico',
    required: [true, 'Tipo de serviço é obrigatório']
  },
  enderecoExecucao: {
    type: String,
    required: [true, 'Endereço de execução é obrigatório'],
    trim: true
  },
  imagem: {
    type: String,
    default: ''
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'finalizada', 'cancelada'],
    default: 'pendente'
  },
  observacoes: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('OrdemServico', ordemServicoSchema);
