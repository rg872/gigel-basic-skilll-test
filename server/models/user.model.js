const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const only_number_regex = /^[0-9]*$/

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tolong isi nama kamu']
    },

    email: {
        type: String,
        unique: true,
        match: [email_regex, 'Masukan email dengan format yang benar']
    },

    password: {
        type: String,
        match: [password_regex, 'Password setidaknya memiliki 1 huruf, 1 angka dan panjang 8 karakter']
    },
    
    handphone: {
        type: String,
        unique: true,
        required: [true, 'Tolong isi nomor handphone kamu'],
        match: [only_number_regex, 'Tolong isi nomor handphone dengan benar'],
        minlength: [10, 'Tolong isi nomor handphone dengan benar']
    },

    image: String
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {    
    try {        
        this.password = bcrypt.hashSync(this.password, 10)  
        next()
    } catch(err){
        next(err)
    }    
})

const User = mongoose.model('User', userSchema)

module.exports = User