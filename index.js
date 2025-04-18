require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT;
const database = require('./config/database')

const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

const PATH = require('./config/system')
database.connect();


app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.locals.path_url = PATH.ADMIN // tạo biến toàn cục cho tất cả các view 

route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})