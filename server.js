// ------------------------------------ Modules ------------------------------------ //

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');

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

const corsOptions = {
    origin: 'https://git-sum-dim-sum-react.herokuapp.com',
    methods: ["GET", "PUT", "POST", "HEAD", "DELETE", "OPTIONS"],
    headers: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('https://git-sum-dim-sum-react.herokuapp.com', cors());

// ------------------------------------- Routes ------------------------------------ //

app.get('/', (req, res) => {
    res.send('<h1>Git Sum Dim Sum</h1>')
});

app.use('/auth', routes.auth);
app.use('/accounts', routes.accounts);
app.use('/restaurants', routes.restaurants);
app.use('/reviews', routes.reviews);
app.use('/admin/', routes.admin);

// --------------------------------- Server Listener ------------------------------ //

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});