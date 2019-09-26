// ------------------------------------ Modules ------------------------------------ //

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const routes = require('./routes')

// ------------------------------- Instanced Modules ------------------------------- //

const app = express();

// ------------------------- State Configuration Variables ------------------------- //

const PORT = process.env.PORT || 4000;

// ----------------------------------- Middleware ---------------------------------- //

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret secret secret secret secret',
    resave: false,
    saveUninitialized: false
}));

// --------------------------------- Static Assets --------------------------------- //

app.use(express.static(`${__dirname}/public`));

// ------------------------------------- Routes ------------------------------------ //

// HTML Endpoints
app.get('/', routes.restaurants);
app.use('/', routes.viewRestaurant);
app.use('/reviews', routes.reviews);
app.use('/accounts', routes.accounts);
app.use('/profile', routes.profile);

// API Endpoints
app.get('/api/v1/restaurants', routes.restaurants);
app.get('/api/v1/users', routes.users);
app.use('/api/v1/reviews', routes.reviews)

// --------------------------------- Server Listener ------------------------------ //

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});