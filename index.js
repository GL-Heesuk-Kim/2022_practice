const express = require('express')
const app = express()
const port = 982

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // npm install cookie-parser --save
const config = require('./config/key');

const {User} = require("./models/User"); //Register Route 설정 중 :


//application/x-www-form-urlencoded 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.urlencoded({extended: true}));

//applicaiton/json 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.json());

app.use(cookieParser());



const mongoose = require('mongoose')
mongoose.connect(
    config.mongoURI
    ).then(() => console.log('MongoDB Is Connected GL^.^'))
     .catch(err => console.log('Hey GL, We Got Problem With Connecting MongoDB...\n', err))



app.get('/', (req, res) => {
  res.send(`Hello World! 안녕하세요. 
  단순히 비쥬얼만 보여지는 것이 아니라
  기능이 구현된 페이지를 만들고 싶습니다. 감사합니다.`)
})


//회원가입을 위한 Route(라우트) 만들기
app.post('/register', (req, res) => {
  //Register Route 설정 중 : 회원가입시 필요한 정보들을
  //모아서 데이터 베이스에 넣어주는 일

  const user = new User(req.body)
  //req.body안에 아이디와 패스워드 정보가 담겨서 들어오게 되는게 이게 가능한 이유는 bodyparser가 있기 때문

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
  //.save는 몽고디비에서 오는 메소드 => req.body에 담겨있는 정보들이 user 모델에 저장(save)가 됨
})



  // 로그인 라우트 생성 app.post
// app.post('/login', (req, res) => {
// // app.post('/api/users//login', (req, res) => {}
//   //1. 요청된 이메일이 데이터베이스에 있는지 찾는다.(몽고디비가 제공하는 findOne 메소드 활용)
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if(!user) {
//       return res.json({
//         loginSuccess: false,
//         message: "해당 이메일을 가진 유저가 없습니다"
//       })
//     }
//   //2. 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는 것인지 확인 
//     user.comparePassword(req.body.password , (err, isMatch) => {
//       if(!isMatch)
//         return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."
    
//   //3. 비밀번호까지 맞다면 그 유저를 위한 토큰을 생성  \
      
//       user.generateToken((err, user) => {
//         if(err) return res.status(400).send(err);

//         // 토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지 ....
//         res.cookie("x_auth", user.token)   
//         .status(200)
//         .json({loginSuccess: true, userID: user._id})
//         })
//       })
//     })
//   })
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
