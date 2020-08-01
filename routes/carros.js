let express = require('express');
let router = express.Router();
let controller = require('../controllers/Carros')


router.get('/Carros/', controller.getAllcarros);
router.get('/Carros/:id', controller.getCarroById);
router.post('/Carros/', controller.addCarro);
router.put('/Carros/:id', controller.editCarro);
router.delete('/Carros/:id', controller.deleteCarro);



module.exports = router;