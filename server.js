const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine', 'hbs')

// middleware
app.use((req, res, gas) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log)
    // fs.append(file, data, callback)
    fs.appendFile('server.log', log + '\n', (e)=> {
        if(e){
            console.log('gabisa append server.log')
        }
    });
    gas();
});

//buat maintenance
/*app.use((req, res, gas) => {
    // otomatis render dari folder views
    res.render('maintenance.hbs',{
        pageTitle: 'We will be right back',
        welcomeMessage: 'The site is currently being updated.'
    });
});*/

app.use(express.static(__dirname + '/public')) //middleware

hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.get('/', (req, res) => {
    // otomatis render dari folder views
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Hallo bro'
    });
})

app.get('/about', (req, res) => {
    // otomatis render dari folder views
    res.render('about.hbs', {
        pageTitle : 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'gabisa handle request'
    });
})


app.listen(3000, ()=>{
    console.log('server started on port 3000');
}); 