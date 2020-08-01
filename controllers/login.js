let User = require('../models/Usuario');


module.exports = {
    signup: (req, res, next) => {
        console.log(req.body)
        let usuario = new User({
            nome: req.body.nome,
            cpf: req.body.cpf,
            senha: req.body.senha
        })

        usuario.save()
            .then(user => {
                res.status(200).json({ msg: 'Usuário cadastrado com sucesso!', usuario: user })
            })

        .catch(error => {
            res.status(500).json({ msg: 'Erro ao salvar usuario!', error: error })
        })
    },
    login: (req, res, next) => {
        let cpf = req.body.cpf
        let senha = req.body.senha

        User.findOne({ 'cpf': cpf })
            .then(user => {
                if (user == null) {
                    return res.status(401).json({
                        msg: 'Usuário não encontrado. Faça o cadastro.',
                        token: null
                    })
                } else {
                    user.compararSenha(senha, (err, isMatch) => {
                        if (isMatch && err == null) {
                            user.gerarTokenJWT()
                                .then(sucesso => {
                                    return res.status(200).json(sucesso)
                                }).catch(error => {
                                    return res.status(401).json(error)
                                })
                        } else {
                            return res.status(401).json({
                                msg: "Senha incorreta. Tente novamente.",
                                token: null
                            })
                        }

                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    msg: "Erro ao buscar usuário. Tente novamente.",
                    error: error
                })
            })

    },

    logout: (req, res, next) => {
        console.log('USER LOGGED', req.user)
        const idUsuario = req.user._id;

        User.update({ _id: idUsuario }, {
                $set: { token: null }
            })
            .then(user => {
                res.status(200).json({
                    msg: "Logout realizado com sucesso!"
                })
            }).catch(error => {
                res.status(500).json({
                    msg: "Erro ao realizar logout. Tente novamente!",
                    error: err
                })
            })
    }
}