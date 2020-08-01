const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

module.exports = {
    verificarUsuarioLogado: (req, res, next) => {
        if (req.headers.authorization != undefined) {
            let token = req.headers['authorization'].replace('Bearer ', '')
            if (token) {
                jwt.verify(token, 'tokentokentokentokentoken', function(err, decoded) {
                    console.log('token', decoded)
                    if (err) {
                        console.log(err)
                        return res.status(401).json({

                            msg: "Falha a verificar token."
                        })
                    }

                    let UsuarioId = decoded._id
                    let nomeUsuario = decoded.nome

                    // req.User._id = UsuarioId
                    //  req.User.nome = nomeUsuario

                    Usuario.findOne({
                            _id: UsuarioId,
                            token: token
                        }, { nome: 1, cpf: 1, group: 1, _id: 1 })
                        .then(user => {
                            console.log('USER', user)
                            if (!user) {
                                return res.status(401).json({
                                    msg: "Token invalido. Faça o Login!"
                                })
                            }
                            req.user = user;
                            console.log('user', user)
                            next();
                        })
                        .catch(error => {
                            msg: "Erro ao buscar usuário!"
                            error: error

                        })
                })
            } else {
                return res.status(401)({
                    msg: 'O envio do token é obrigatório!'
                })
            }
        } else {
            return res.status(401).json({
                msg: "Não foi informado um token."
            })
        }
    },

    verificarGrupo: (role) => {
        return function(req, res, next) {
            if (role != null && role.includes(req.user.group)) {
                next()
            } else {
                return res.status(403).json({
                    msg: "O usuário não tem acesso a esse grupo!"
                })
            }
        }
    }
}