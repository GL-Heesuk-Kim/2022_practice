const express = require('express')
const app = express()
const port = 982

const bodyParser = require('body-parser');
const {User} = require("./models/User"); //Register Route 설정 중 :


//application/x-www-form-urlencoded 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.urlencoded({extended: true}));

//applicaiton/json 형태로 된 파일을 서버에서?! 읽을 수 있도록 해주기 위함
app.use(bodyParser.json());



const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://glterrace:faith457a@glcluster.sj7yp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ).then(() => console.log('MongoDB Is Connected GL^.^'))
     .catch(err => console.log('Hey GL, We Got Problem With Connecting MongoDB...\n', err))



app.get('/', (req, res) => {
  res.send(`Hello World! 안녕하세요. 
  단순히 비쥬얼만 보여지는 것이 아니라
  기능이 구현된 페이지를 만들고 싶습니다`)
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})