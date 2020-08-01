let connection = require('../config/database.js')();
let Carro = require('../models/Carro');


module.exports = {
    getAllcarros: (req, res, next) => {
        Carro.find()
            .then(carros => {
                res.status(200).json(carros);
            })
            .catch(error => {
                res.status(500).json(error)
            })

    },
    getCarroById: (req, res, next) => {
        Carro.findOne({
                _id: req.params.id
            })
            .then(carro => {
                res.status(200).json(carro)
            }).catch(error => {
                res.status(500).json(error)
            })
    },

    addCarro: (req, res, next) => {

        let carro = new Carro({
            nome: req.body.nome,
            marca: req.body.marca,
            ano: req.body.ano
        })

        carro.save()
            .then(car => {
                res.status(200).json({ msg: 'Carro cadastrado com sucesso!', carro: car })
            })

        .catch(error => {
            res.status(500).json({ msg: 'Erro ao salvar carro!', error: error })
        })
    },

    editCarro: (req, res, next) => {

        Carro.updateOne({ _id: req.params.id }, {
                nome: req.body.nome,
                marca: req.body.marca,
                ano: req.body.ano
            }).then(car => {
                res.status(200).json({ msg: "Carro alterado com sucesso!" })
            })
            .catch(error => {
                res.status(500).json({ msg: "Erro ao alterar carro!", error: error })
            })
    },

    deleteCarro: (req, res, next) => {
        Carro.deleteOne({
                _id: req.params.id
            }).then(() => {
                res.status(200).json({ msg: "Carro deletado com sucesso!" })
            })
            .catch(error => {
                req.status(500).json(error)
            })

    }
}