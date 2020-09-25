const express = require('express')
const Handlebars = require('express-handlebars')
const indexRouter = require('./routes/index')
const authUserRouter = require('./routes/authUser')
const authCompanyRouter = require('./routes/authCompany')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const path = require('path')
const port = 3001 || process.env.PORT
const db = require('./config/db')
const {secret} = require('./config/session')
const csurf = require('csurf')
const user = require('./models/user')
const csrfProtection = csurf()
const handlebarsPaginate = require('handlebars-paginate')
 
//Static file
app.use(express.static(path.join(__dirname , 'public')))


//Template engine
app.engine('handlebars',Handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }))

//DB
mongoose.connect(db.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('DB connected')
}).catch((err)=>{
    console.log(err)
})

//Session
app.use(session({
    secret:secret,
    saveUninitialized: false,
    resave:false
})) 
app.use(csrfProtection)
app.use(flash())
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

//middleware
app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.locals.csrfToken = token;
    next();
});

app.use(helmet())
app.use(compression())

//Router
app.use(indexRouter)
app.use('/users',authUserRouter)
app.use('/companies',authCompanyRouter)


//Start the server 
app.listen(port)