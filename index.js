const express = require('express')
const app = express()
const port = 982

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})