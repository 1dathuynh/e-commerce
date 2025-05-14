require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var methodOverride = require('method-override')
var flash = require('express-flash')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT;
const database = require('./config/database')


const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

const PATH = require('./config/system')
database.connect();


app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.use(cookieParser('SAHHSKSH'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true }))
app.use(express.static(`${__dirname}/public`))

app.locals.path_url = PATH.ADMIN // tạo biến toàn cục cho tất cả các view 

route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})