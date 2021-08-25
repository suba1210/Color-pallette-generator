//requiring node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var bodyParser = require('body-parser')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const flash = require('connect-flash');

const {checkAuth} =require('./middleware/checkauth');


//Routes
const colorRout = require('./Routes/colorRout');
const authRout = require('./Routes/authRout');

// require Models
const Color = require('./models/colorModel');
const User = require('./models/userModel');


// connecting to database
mongoose.connect('mongodb://localhost:27017/onsite3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


const sessionConfig = {
    secret : 'thisisasecret',
    resave : false,
    saveUninitialized:false
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use(colorRout);
app.use(authRout);


app.post('/data',async(req,res)=>{
    console.log(req.body.owner);
    const colorPal = new Color(req.body);
    await colorPal.save();
    const user = await User.findById(req.body.owner);
    user.colors = user.colors.concat(colorPal._id);
    await user.save();
    res.end();
})

app.post('/dataedit',async(req,res)=>{
    const colorPal = await Color.findById(req.body.colorId);
    colorPal.colors = req.body.colors;
    await colorPal.save();
    res.end();
})


app.get('/',(req,res)=>{
    res.redirect('/login');
})


app.listen(3000, () => {
    console.log('Serving on port 3000');
})