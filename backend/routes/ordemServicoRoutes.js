const express = require('express');
const router = express.Router();
const { 
  getOrdensServico,
  getOrdemServicoById,
  createOrdemServico,
  updateOrdemServico,
  deleteOrdemServico,
  filtrarOrdensServico,
  upload
} = require('../controllers/ordemServicoController');

// Rotas para ordens de serviço
router.route('/')
  .get(getOrdensServico)
  .post(upload.single('imagem'), createOrdemServico);

router.route('/filtrar')
  .get(filtrarOrdensServico);

router.route('/:id')
  .get(getOrdemServicoById)
  .put(upload.single('imagem'), updateOrdemServico)
  .delete(deleteOrdemServico);

module.exports = router;
