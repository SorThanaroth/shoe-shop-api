const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const https = require('https')

app.use(cors('*'))
app.use('/static/uploads',express.static('uploads'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(express.json());

// Connect session
require('./configs/session')(app);

// Connect mongodb
require('./configs/db')();

app.use(require('./routes'));

app.use((err, req, res, next) => {
  return res.json({
    success: false,
    code: 0,
    error: err
  })
})

// Health check endpoint used by uptime pings and load balancers
app.get('/app', (req, res) => {
  return res.json({ success: true, status: 'ok' });
});

setInterval(function() {
        https.get('https://shoe-shop-api.onrender.com/app', (res) => {
            console.log('Hi, The app to keep it alive:', res.statusCode);
        }).on('error', (err) => {
            console.log('Error pinging the app:', err.message);
        });
    }, 5 * 60 * 1000)


app.listen( 3001, () => console.log('App avaiable on http://localhost:3001'))

