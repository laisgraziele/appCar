let express = require('express');
let router = express.Router();
let controller = require('../controllers/Usuarios')
let auth = require('../lib/auth')


router.get('/Usuarios/', auth.verificarUsuarioLogado, auth.verificarGrupo(['user']), controller.getAllusers);
router.get('/Usuarios/:id', controller.getUserById);
router.post('/Usuarios/', auth.verificarUsuarioLogado, controller.addUser);
router.put('/Usuarios/:id', controller.editUser);
router.delete('/Usuarios/:id', controller.deleteUser);



module.exports = router;