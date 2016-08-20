const bodyparser = require('body-parser');
const basicAuth = require('basic-auth-connect');
const config = require('./config');
const compression = require('compression');
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');


const app = express();
const routes = {
    ha: require('./routes/ha'),
    home: require('./routes/home'),
    moderation: require('./routes/moderation'),
    pledge: require('./routes/pledge'),
    wall: require('./routes/wall')
};


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public/'));


mongoose.connect(config.mongodb_connection_string);


app.get('/moderation', basicAuth('username', 'password'), routes.moderation);
app.post('/moderation', basicAuth('username', 'password'), routes.moderation);


app.get('/admin', routes.ha);


app.get('/wall', routes.wall);


app.get('*', routes.home);
app.post('/pledge', routes.pledge);


app.listen(process.env.PORT || 3000, () => console.log(`"I'm With Jeremy" listening on port ${ (process.env.PORT || 3000) }`));