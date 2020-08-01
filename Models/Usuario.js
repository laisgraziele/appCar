let mongoose = require('mongoose')
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let userSchema = new Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    token: { type: String, default: null },
    group: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }

}, { versionKey: false })

userSchema.pre('save', function(next) {
    const usuario = this;
    if (usuario.isModified('senha') || usuario.isNew) {
        bcrypt.hash(usuario.senha, 8)
            .then(hash => {
                usuario.senha = hash;
                next();
            })
            .catch(error => {
                next(error);
            })
    } else {
        return next();
    }
})

userSchema.methods.compararSenha = function(senha, callback) {
    bcrypt.compare(senha, this.senha, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    })
}
userSchema.methods.gerarTokenJWT = function() {
    return new Promise((success, reject) => {
        const usuario = this;

        const token = jwt.sign({
                _id: usuario._id,
                nome: usuario.nome
            },
            'tokentokentokentokentoken', { expiresIn: '7d' }

        )

        usuario.token = token;
        usuario.save()
            .then(user => {
                success({
                    msg: "Usuario logado com sucesso",
                    token: token
                })
            })

        .catch(error => {
            reject({
                token: null,
                error: error.errmsg
            })
        })
    })
}
module.exports = mongoose.model('User', userSchema)