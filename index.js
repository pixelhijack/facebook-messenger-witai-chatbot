'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const echoMessage = require('./messageTypes/echo');
const genericMessage = require('./messageTypes/generic');
const buttonMessage = require('./messageTypes/button');
const messageBuilder = require('./util/messageBuilder');

const sendMessage = messageBuilder(process.env.VERIFY_TOKEN);

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chatbot')
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
});

app.post('/webhook/', function (req, res) {
    console.log('-----------------');
    console.log('[POST /webhook] \n', JSON.stringify(req.body.entry[0], null, 2));
    console.log('-----------------');
    if(req.body.entry[0] && req.body.entry[0].messaging){
        req.body.entry[0].messaging.forEach((event) => {
            if (event.message && event.message.text && event.message.is_echo) {
                let text = event.message.text;
                sendMessage(sender, buttonMessage);
            }
        });
    }
    res.sendStatus(200);
});

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
