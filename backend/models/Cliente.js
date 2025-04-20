const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  documento: {
    type: String,
    required: [true, 'CPF ou CNPJ é obrigatório'],
    trim: true,
    unique: true
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    trim: true,
    lowercase: true
  },
  endereco: {
    rua: {
      type: String,
      required: [true, 'Rua é obrigatória'],
      trim: true
    },
    numero: {
      type: String,
      required: [true, 'Número é obrigatório'],
      trim: true
    },
    bairro: {
      type: String,
      required: [true, 'Bairro é obrigatório'],
      trim: true
    },
    cidade: {
      type: String,
      required: [true, 'Cidade é obrigatória'],
      trim: true
    },
    estado: {
      type: String,
      required: [true, 'Estado é obrigatório'],
      trim: true
    },
    cep: {
      type: String,
      required: [true, 'CEP é obrigatório'],
      trim: true
    }
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cliente', clienteSchema);
