let connection = require('../config/database.js')();
let User = require('../models/Usuario');


module.exports = {
    getAllusers: (req, res, next) => {
        User.find()
            .then(usuarios => {
                res.status(200).json(usuarios);
            })
            .catch(error => {
                res.status(500).json(error)
            })
    },
    getUserById: (req, res, next) => {
        User.findOne({
                _id: req.params.id
            })
            .then(user => {
                res.status(200).json(user)
            }).catch(error => {
                res.status(500).json(error)
            })
    },

    addUser: (req, res, next) => {

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
            res.status(500).json({ msg: 'Erro ao salvar usuario! blablabla', error: error })
        })
    },

    editUser: (req, res, next) => {
        User.updateOne({ _id: req.params.id }, {
                nome: req.body.nome,
                cpf: req.body.cpf

            }).then(car => {
                res.status(200).json({ msg: "Usuario alterado com sucesso!" })
            })
            .catch(error => {
                res.status(500).json({ msg: "Erro ao alterar usuario!", error: error })
            })
    },

    deleteUser: (req, res, next) => {
        User.deleteOne({
                _id: req.params.id
            }).then(() => {
                res.status(200).json({ msg: "Usuário deletado com sucesso!" })
            })
            .catch(error => {
                req.status(500).json(error)
            })
    }
}