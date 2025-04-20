const mongoose = require('mongoose');

const tipoServicoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do tipo de serviço é obrigatório'],
    trim: true,
    unique: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição detalhada é obrigatória'],
    trim: true
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TipoServico', tipoServicoSchema);
