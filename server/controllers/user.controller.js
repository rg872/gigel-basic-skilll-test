const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { sendRegisterEmail } = require('../helpers/mailConfig')
const CustomError = require('../helpers/customError')

const secret = process.env.SECRET

module.exports = {
    async registerUser (req, res, next) {        
        try {
            let user = await User.create(req.body)
            let token = jwt.sign({ id: user._id }, secret)

            res.header({
                'Access-Control-Expose-Headers': 'token',
                token
            })            
            res.status(200).json({
                message: 'Berhasil mendaftar akun baru',
                user: {
                    name: user.name,
                    email: user.email,
                    handphone: user.handphone,
                    image: user.image
                }
            })

            await sendRegisterEmail(user.email)
        } catch(err){
            next(err)
        }
        
    },

    async loginUser (req, res, next) {
        let { email, password } = req.body

        try {
            let user = await User.findOne({email})   
                                   
            if (!user || !bcrypt.compareSync(password, user.password)) {

                throw ({status: 400, message: 'Email/password salah'})

            } else {
                let token = jwt.sign({ id: user._id }, secret)
                res.header({
                    'Access-Control-Expose-Headers': 'token',
                    token
                })                
                res.status(200).json({
                    message: 'Berhasil masuk',
                    user: {
                        name: user.name,
                        email: user.email,
                        handphone: user.handphone,
                        image: user.image
                    }
                })
            }
        } catch(err) {
            next(err)
        }
    },

    updateUser (req, res, next) {
        let { id } = req.decoded

        // password has its own controller
        if (req.body.password) delete req.body.password

        User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        .then(user => {
            res.status(200).json({
                message: 'Berhasil ganti data akun kamu',
                user: {
                    name: user.name,
                    email: user.email,
                    handphone: user.handphone,
                    image: user.image
                }
            })
        }).catch(next)

    },

    changePassword (req, res, next) {
        let { id } = req.decoded
        User.findById(id)
        .then(user => {
            if(!(bcrypt.compareSync(req.body.oldpassword, user.password))) {
                throw new CustomError('Password yang ingin diganti salah', '404')
            }
    
            let hash = bcrypt.hashSync(req.body.password, 10)
            User.findOneAndUpdate({_id: id}, {password: hash})
            .then(() => {
                res.status(200).json({
                    message: 'Berhasil ganti password'
                })
            })
            .catch(next)
        })
        .catch(next)
    },

    deleteUser (req, res, next) {
        let { id } = req.decoded

        User.findByIdAndRemove(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil delete akun kamu'
            })
        }).catch(next)
    },

    verifyUser (req, res, next) {
        let { id } = req.decoded

        User.findById(id)
        .then(user => {
            res.status(200).json({
                message: 'Berhasil verify token akun',
                user: {
                    name: user.name,
                    email: user.email,
                    handphone: user.handphone,
                    image: user.image
                }
            })
        }).catch(next)
    },
}