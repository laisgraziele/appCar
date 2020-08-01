let express = require('express');
let router = express.Router();
let controller = require('../controllers/login')
let auth = require('../lib/auth')

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', auth.verificarUsuarioLogado, controller.logout);

module.exports = router;