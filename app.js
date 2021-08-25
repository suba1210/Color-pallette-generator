//requiring node modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var bodyParser = require('body-parser')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;




//Routes
const colorRout = require('./Routes/colorRout');

// require Models
const Color = require('./models/colorModel');


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



app.use(colorRout);


app.post('/data',(req,res)=>{
    console.log(req.body);
    const colorPal = new Color({colors:req.body});
    colorPal.save();
    res.end();
})



app.get('/',(req,res)=>{
    res.redirect('/color/create');
})


app.listen(3000, () => {
    console.log('Serving on port 3000');
})