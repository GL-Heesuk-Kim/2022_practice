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
        maxlength: 100
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

// #11 login part
userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword 1234  & 암호화된 비밀번호 2d$sd2#^d$36
    //암호화가 된 비밀번호를 복화할 수는 없다. 그렇다면 플레인패스워드를 똑같이 암호화해서 그 둘이 같은지를 확인해야한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
    

}


userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(),  'secretToken')

    // user._id + 'secretToken' = token

    // ->

    // 'secretToken' -> user._id
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}



const User = mongoose.model('User', userSchema)

module.exports = {User}

