const express = require('express')
const app = express()
const port = 982

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // npm install cookie-parser --save
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User"); //Register Route 설정 중 :


//application/x-www-form-urlencoded 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.urlencoded({extended: true}));

//applicaiton/json 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.json());

app.use(cookieParser());



const mongoose = require('mongoose')
mongoose.connect(
    config.mongoURI
    ).then(() => console.log('연결됐습니다. 100% 연결되었어요.'))
     .catch(err => console.log('Hey GL, We Got Problem With Connecting MongoDB...\n', err))



app.get('/', (req, res) => {
  res.send(`Hello World! 안녕하세요. 
  단순히 비쥬얼만 보여지는 것이 아니라
  기능이 구현된 페이지를 만들고 싶습니다. 감사합니당.`)
})


app.get('/api/hello', (req, res)=> {

  res.send("랜딩페이지에 응답합니다. 안녕하세요.!")
})


//회원가입을 위한 Route(라우트) 만들기
app.post('/register', (req, res) => {
  //Register Route 설정 중 : 회원가입시 필요한 정보들을
  //모아서 데이터 베이스에 넣어주는 일

  const user = new User(req.body)
  //req.body안에 아이디와 패스워드 정보가 담겨서 들어오게 되는게 이게 가능한 이유는 bodyparser가 있기 때문

  user.save((err, UserInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
  //.save는 몽고디비에서 오는 메소드 => req.body에 담겨있는 정보들이 user 모델에 저장(save)가 됨
})


//#11-login route
app.post('/api/user/login', (req,res) => {
  
  // 요청된 이일ㅡㄹ 데터이스에서 있는지 찾ㅡ다
  User.findOne({ email: req.body.email  }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일로 가입된 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password , (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
  
      // 비밀번호까지 맞다면 토큰을 생성하기. 
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등...
              res.cookie("x_auth", user.token)  // 'name과 'value'탭에 표시되는 것
              .status(200)
              .json({ loginSuccess: true, userId: user._id})
        
        
      })

    
      
    })

  // 요청된 이메일이 데이터 베스 있다면 비밀번호가 맞는 비밀번호 인지 확인

  })

})



app.get('/api/users/auth', auth, (req, res) =>{
  //여기까지 왔다는 얘기는 authentication이 true라는 말.
  //role 1 -> admin   role 2 -> certain department admin
  //role 0 -> normal user   role != 0 -> 관리자
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req. user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id}, 
    { token: ""}
    , (err, user) => {
      if(err) return res.json({ success:false, err});
      return res.status(200).send({
        success: true
      })
    })

})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
