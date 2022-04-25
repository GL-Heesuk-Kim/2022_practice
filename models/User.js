const mongoose = require('mongoose')

//비밀번호 암호화 작업: salt활용 ; saltround 10이면 10자리를 ...
const bcrypt = require('bcrypt');
const { is } = require('express/lib/request');
const saltRounds = 10

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //스페이스 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        maxlength: 15
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


//이건 몽구스에서 가져온 메소드
userSchema.pre('save', function( next ){
    var user = this;

     if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()

            })
        })
     }else {
         next()
     }
})


const User = mongoose.model('User', userSchema)

module.exports = {User}

