
const { User } = require('../models/User');

let auth = (req, res, next) => {

    //클라이언트 토큰의 인증처리를 하는 곳

    //1.클라이언트 쿠키에서 토큰을 가져옵니다
    let token = req.cookies.x_auth;

    //2.토큰을 복호화(디코딩) 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();

    })

    //3-1. 유저가 있으면 인증 오케이

    //3-2. 유저가 없으면 인증 노




}

module.exports = { auth };