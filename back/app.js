const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const db = require('./models')
db.sequelize.sync()
  .then(() => {
    console.log('db 연결성공')
  })
  .catch((error) =>console.log(error))


/*
get -> 가져오기
post -> 생성하기
put -> 전체 수정
delete -> 제거
patch -> 부분 수정
options -> 찔러보기 (서버야, 요청 보낼 수 있어?)
head -> 헤더만 가져오기
*/

const app = express()
app.use(cors({
  origin: '*',
  credentials: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send('hello express')
})

app.get('/api', (req, res) => {
  res.send('hello api')
})

app.get('/api/posts', (req, res) => {
  res.json([
    {
      id: 1,
      content: 'hello1'
    },
    {
      id: 2,
      content: 'hello2'
    },
    {
      id: 3,
      content: 'hello3'
    }
  ])
})

app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(5001, () => {
  console.log('서버 실행 중')
})
