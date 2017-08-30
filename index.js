'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const echoMessage = require('./messageTypes/echo');
const genericMessage = require('./messageTypes/generic');
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
    let messaging_events = req.body.entry[0].messaging;
    console.log('[POST /webhook], ', JSON.stringify(messaging_events, null, 2));
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i];
	    let sender = event.sender.id;
	    if (event.message && event.message.text) {
		    let text = event.message.text;
		    sendMessage(sender, genericMessage);
	    }
    }
    res.sendStatus(200)
});

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
