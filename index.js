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


// view setup
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

//middlewares
app.use(cookieParser('SAHHSKSH'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true }))
app.use(express.static(`${__dirname}/public`))

app.locals.path_url = PATH.ADMIN // tạo biến toàn cục cho tất cả các view 
// CSP middleware
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src https://fonts.gstatic.com; img-src 'self' blob: data:; connect-src 'self';"
//   );
//   next();
// });

route(app)
routeAdmin(app)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})