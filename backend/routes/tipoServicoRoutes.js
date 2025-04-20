const express = require('express');
const router = express.Router();
const { 
  getTiposServico, 
  getTipoServicoById, 
  createTipoServico, 
  updateTipoServico, 
  deleteTipoServico 
} = require('../controllers/tipoServicoController');

// Rotas para tipos de serviço
router.route('/')
  .get(getTiposServico)
  .post(createTipoServico);

router.route('/:id')
  .get(getTipoServicoById)
  .put(updateTipoServico)
  .delete(deleteTipoServico);

module.exports = router;
